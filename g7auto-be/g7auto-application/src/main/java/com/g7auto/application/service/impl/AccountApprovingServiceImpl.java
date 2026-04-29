package com.g7auto.application.service.impl;

import static com.g7auto.core.utils.RoleUtils.containsRole;
import static com.g7auto.core.utils.RoleUtils.hasRole;

import com.g7auto.application.dto.request.AccountApprovingSearchRequest;
import com.g7auto.application.dto.request.AccountRequest;
import com.g7auto.application.dto.request.StatusRequest;
import com.g7auto.application.dto.response.AccountApprovingResponse;
import com.g7auto.application.mapper.AccountApprovingMapper;
import com.g7auto.application.service.AccountApprovingService;
import com.g7auto.core.constant.codes.AuthErrorCode;
import com.g7auto.core.constant.codes.SuccessCode;
import com.g7auto.core.entity.AccountApprovingAction;
import com.g7auto.core.entity.AccountApprovingStatus;
import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.entity.Role;
import com.g7auto.core.exception.BadRequestException;
import com.g7auto.core.exception.ConflictUtils;
import com.g7auto.core.exception.NotFoundUtils;
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
import org.springframework.security.crypto.password.PasswordEncoder;
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
  private final PasswordEncoder passwordEncoder;

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
            List.of(AccountApprovingStatus.AWAITING_APPROVAL.name()),
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
    List<String> statusApprove = List.of(AccountApprovingStatus.APPROVED.name(),
        AccountApprovingStatus.REJECTED.name());

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
  public AccountApprovingResponse create(AccountRequest request) {
    validateRoleRestrictions(request.getRoles());
    String username = request.getUsername();

    checkAccountApproving(username);

    if (accountRepository.existsByUsername(username)) {
      throw ConflictUtils.usernameConflict(username);
    }

    if (accountRepository.existsByEmail(request.getEmail())) {
      throw ConflictUtils.emailConflict(request.getEmail());
    }

    String password = request.getPassword();
    if (password == null || password.isBlank()) {
      log.error("Mật khẩu không được để trống khi tạo tài khoản mới");
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00208);
    }

    AccountApproving create = accountApprovingMapper.toEntity(request);
    create.setPassword(passwordEncoder.encode(request.getPassword()));
    create.setStatusApproving(AccountApprovingStatus.AWAITING_APPROVAL);
    create.setAction(AccountApprovingAction.CREATE);

    return accountApprovingMapper.toResponse(accountApprovingRepository.save(create));
  }

  @Override
  @Transactional
  public AccountApprovingResponse update(Long id, AccountRequest request) {
    Account account = get(id);
    validateRoleRestrictions(request.getRoles());
    validateActionOnTarget(account);

    String username = request.getUsername();
    checkAccountApproving(username);
    if (!account.getUsername().equals(username) && accountRepository.existsByUsername(username)) {
      throw ConflictUtils.usernameConflict(username);
    }

    String requestEmail = request.getEmail();
    if (!account.getEmail().equals(requestEmail) && accountRepository.existsByEmail(requestEmail)) {
      throw ConflictUtils.emailConflict(requestEmail);
    }

    AccountApproving update = accountApprovingMapper.toEntity(request);
    update.setId(id);
    update.setStatusApproving(AccountApprovingStatus.AWAITING_APPROVAL);
    update.setAction(AccountApprovingAction.UPDATE);

    String requestPassword = request.getPassword();
    if (requestPassword != null && !requestPassword.isBlank()) {
      update.setPassword(passwordEncoder.encode(requestPassword));
    } else {
      update.setPassword(account.getPassword());
    }

    return accountApprovingMapper.toResponse(accountApprovingRepository.save(update));
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

    validateActionOnTarget(account);

    AccountApproving approving = new AccountApproving();
    accountApprovingMapper.mapAccountToEntity(account, approving);
    approving.setStatusApproving(AccountApprovingStatus.AWAITING_APPROVAL);

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
    if (!action.equalsIgnoreCase("APPROVE") && !action.equalsIgnoreCase("REJECT")) {
      throw new BadRequestException("");
    }

    String username = request.getUsername();
    AccountApproving approving =
        accountApprovingRepository.findByUsernameAndStatusApproving(username,
            AccountApprovingStatus.AWAITING_APPROVAL).orElse(null);
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

    validateActionOnTarget(account);

    approving.setStatusApproving(
        action.equals("APPROVE") ? AccountApprovingStatus.APPROVED
            : AccountApprovingStatus.REJECTED);

    AccountApprovingAction actionApprove = approving.getAction();
    if (actionApprove.equals(AccountApprovingAction.ACTIVE) || actionApprove.equals(
        AccountApprovingAction.UNLOCK)) {
      account.setStatus(AccountStatus.ACTIVE);
    } else if (actionApprove.equals(AccountApprovingAction.LOCK)) {
      account.setStatus(AccountStatus.LOCKED);
    } else if (actionApprove.equals(AccountApprovingAction.INACTIVE)) {
      account.setStatus(AccountStatus.INACTIVE);
    } else if (actionApprove.equals(AccountApprovingAction.CREATE)) {
      // TODO
    }

    accountRepository.save(account);
    accountApprovingRepository.save(approving);

    return SuccessCode.G7_AUTO_00001;
  }

  private void validateRoleRestrictions(List<Role> requestedRoles) {
    if (requestedRoles == null || requestedRoles.isEmpty()) {
      return;
    }

    boolean isSuperAdmin = hasRole(Role.SUPERADMIN.name());
    boolean isAdmin = hasRole(Role.ADMIN.name());

    boolean targetHasSuperAdmin = requestedRoles.contains(Role.SUPERADMIN);
    boolean targetHasAdmin = requestedRoles.contains(Role.ADMIN);

    if (isAdmin && !isSuperAdmin) {
      if (targetHasAdmin || targetHasSuperAdmin) {
        log.error("ADMIN không được phép gán quyền ADMIN hoặc SUPERADMIN");
        throw new BadRequestException(AuthErrorCode.G7_AUTO_00212);
      }
    }

    if (isSuperAdmin) {
      if (targetHasSuperAdmin) {
        log.error("Đã tồn tại tài khoản SUPERADMIN, không thể tạo thêm");
        throw new BadRequestException(AuthErrorCode.G7_AUTO_00213);
      }
    }
  }

  private void validateActionOnTarget(Account targetAccount) {
    boolean currentIsSuperAdmin = hasRole(Role.SUPERADMIN.name());
    boolean currentIsApproval = hasRole(Role.APPROVAL.name());

    List<Role> targetRoles = targetAccount.getRoles();
    boolean targetIsSuperAdmin = containsRole(targetRoles, Role.SUPERADMIN);

    // SUPERADMIN không được tác động lên SUPERADMIN khác
    if (currentIsSuperAdmin) {
      if (targetIsSuperAdmin) {
        log.error("SUPERADMIN không có quyền tác động lên tài khoản SUPERADMIN khác");
        throw new BadRequestException(AuthErrorCode.G7_AUTO_00214);
      }
    } else {
      if (!currentIsApproval) {
        log.error("Không có quyền phê duyệt");
        throw new BadRequestException(AuthErrorCode.G7_AUTO_00214);
      }
    }
  }

  private Account get(Long id) {
    return accountRepository.findById(id).orElseThrow(() -> NotFoundUtils.accountIdNotFound(id));
  }

  private void checkAccountApproving(String username) {
    AccountApproving approving = accountApprovingRepository.findByUsername(username).orElse(null);
    if (approving != null && approving.getStatusApproving()
        .equals(AccountApprovingStatus.AWAITING_APPROVAL)) {
      log.error("Tài khoản đang chờ phê duyệt");
      throw new BadRequestException(AuthErrorCode.G7_AUTO_00215);
    }
  }
}
