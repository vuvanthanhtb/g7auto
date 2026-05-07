package com.g7auto.application.service.impl;

import static com.g7auto.core.utils.RoleUtils.hasRole;
import static com.g7auto.core.utils.RoleUtils.validateActionOnTarget;

import com.g7auto.application.dto.request.AccountApprovingSearchRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.AccountApprovingResponse;
import com.g7auto.application.mapper.AccountApprovingMapper;
import com.g7auto.application.service.AccountApprovingService;
import com.g7auto.core.constant.codes.AuthErrorCode;
import com.g7auto.core.constant.codes.SuccessCode;
import com.g7auto.core.entity.AccountApprovingAction;
import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.core.entity.Role;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.response.PageResponse;
import com.g7auto.core.utils.PageableUtils;
import com.g7auto.domain.entity.Account;
import com.g7auto.domain.entity.AccountApproving;
import com.g7auto.infrastructure.persistence.AccountApprovingRepository;
import com.g7auto.infrastructure.persistence.AccountRepository;
import com.g7auto.infrastructure.persistence.query.AccountApprovingQueryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AccountApprovingServiceImpl implements AccountApprovingService {

  private final AccountRepository accountRepository;
  private final AccountApprovingRepository accountApprovingRepository;
  private final AccountApprovingQueryRepository accountApprovingQueryRepository;
  private final AccountApprovingMapper accountApprovingMapper;

  @Override
  public PageResponse<AccountApprovingResponse> search(AccountApprovingSearchRequest request) {
    return PageResponse.of(
        accountApprovingQueryRepository.search(
            request.getUsername(),
            request.getFullName(),
            List.of(request.getStatusApproving()),
            request.getAction(),
            request.getFromDate(),
            request.getToDate(),
            PageableUtils.from(request)
        ),
        accountApprovingMapper::toApprovingResponse,
        request.getFromDate(), request.getToDate()
    );
  }

  @Override
  public PageResponse<AccountApprovingResponse> searchPendingAccounts(
      AccountApprovingSearchRequest request) {
    return PageResponse.of(
        accountApprovingQueryRepository.search(
            request.getUsername(),
            request.getFullName(),
            List.of(ApprovingStatus.AWAITING_APPROVAL.name()),
            request.getAction(),
            request.getFromDate(),
            request.getToDate(),
            PageableUtils.from(request)
        ),
        accountApprovingMapper::toApprovingResponse,
        request.getFromDate(), request.getToDate()
    );
  }

  @Override
  public PageResponse<AccountApprovingResponse> searchApprovedAccounts(
      AccountApprovingSearchRequest request) {
    List<String> statusApprove = List.of(ApprovingStatus.APPROVED.name(),
        ApprovingStatus.REJECTED.name());

    String status = request.getStatusApproving();

    if (status != null && !status.trim().isEmpty()) {
      statusApprove = List.of(request.getStatusApproving());
    }

    return PageResponse.of(
        accountApprovingQueryRepository.search(
            request.getUsername(),
            request.getFullName(),
            statusApprove,
            request.getAction(),
            request.getFromDate(),
            request.getToDate(),
            PageableUtils.from(request)
        ),
        accountApprovingMapper::toApprovingResponse,
        request.getFromDate(), request.getToDate()
    );
  }

  @Override
  @Transactional
  public String requestAccountStatusChange(StatusRequest request) {
    String username = request.getUsername();
    String action = request.getAction();

    Account account = accountRepository.findByUsername(username).orElse(null);
    if (account == null) {
      return AuthErrorCode.G7_AUTO_00210;
    }
    checkAccountApproving(username);

    validateActionOnTarget(account.getRoles());

    AccountApproving approving = new AccountApproving();
    accountApprovingMapper.mapAccountToEntity(account, approving);
    approving.setStatusApproving(ApprovingStatus.AWAITING_APPROVAL);

    if (action.equalsIgnoreCase("LOCK")) {
      approving.setAction(AccountApprovingAction.LOCK);
    } else if (action.equalsIgnoreCase("UNLOCK")) {
      approving.setAction(AccountApprovingAction.UNLOCK);
    } else if (action.equalsIgnoreCase("ACTIVE")) {
      approving.setAction(AccountApprovingAction.ACTIVE);
    } else if (action.equalsIgnoreCase("INACTIVE")) {
      approving.setAction(AccountApprovingAction.INACTIVE);
    } else {
      log.error("Yêu cầu khoá/mở khoá tài khoản không tồn tại: {}", action);
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00217);
    }

    accountApprovingRepository.save(approving);
    return SuccessCode.G7_AUTO_00001;
  }

  @Override
  @Transactional
  public String requestApproval(StatusRequest request) {
    String action = request.getAction();
    boolean isApproved = action.equalsIgnoreCase("APPROVE");
    if (!isApproved && !action.equalsIgnoreCase("REJECT")) {
      throw new BadRequestException("");
    }

//    if (action.equalsIgnoreCase("REJECT"))

    String username = request.getUsername();
    AccountApproving approving =
        accountApprovingRepository.findByUsernameAndStatusApproving(username,
            ApprovingStatus.AWAITING_APPROVAL).orElse(null);
    if (approving == null) {
      return AuthErrorCode.G7_AUTO_00210;
    }

    Account account = accountRepository.findByUsername(username).orElse(null);
    if (account == null) {
      return AuthErrorCode.G7_AUTO_00210;
    }

    boolean isSuperAdmin = hasRole(Role.SUPERADMIN.name());
    boolean isApproval = hasRole(Role.APPROVAL.name());
    if (!isSuperAdmin && !isApproval) {
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00202);
    }

    validateActionOnTarget(account.getRoles());

    approving.setStatusApproving(isApproved ? ApprovingStatus.APPROVED : ApprovingStatus.REJECTED);

    if (isApproved) {
      AccountApprovingAction actionApprove = approving.getAction();
      if (actionApprove.equals(AccountApprovingAction.ACTIVE) || actionApprove.equals(
          AccountApprovingAction.UNLOCK)) {
        account.setStatus(AccountStatus.ACTIVE);
      } else if (actionApprove.equals(AccountApprovingAction.LOCK)) {
        account.setStatus(AccountStatus.LOCKED);
      } else if (actionApprove.equals(AccountApprovingAction.INACTIVE)) {
        account.setStatus(AccountStatus.INACTIVE);
      } else if (actionApprove.equals(AccountApprovingAction.CHANGE_ROLES)) {
        account.setRoles(approving.getRoles());
      }

      accountRepository.save(account);
    }

    accountApprovingRepository.save(approving);
    return SuccessCode.G7_AUTO_00001;
  }

  private void checkAccountApproving(String username) {
    AccountApproving approving = accountApprovingRepository.findByUsername(username).orElse(null);
    if (approving != null && approving.getStatusApproving()
        .equals(ApprovingStatus.AWAITING_APPROVAL)) {
      log.error("Tài khoản đang chờ phê duyệt");
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00215);
    }
  }
}
