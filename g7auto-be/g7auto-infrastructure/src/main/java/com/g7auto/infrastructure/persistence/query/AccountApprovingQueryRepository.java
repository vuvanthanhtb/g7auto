package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.AccountApprovingAction;
import com.g7auto.core.entity.AccountApprovingStatus;
import com.g7auto.core.entity.Role;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.AccountApproving;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccountApprovingQueryRepository {

  private static final String BASE_SQL = """
      SELECT a.id, a.username, a.email, a.full_name, a.roles, a.status,
             a.status_approving, a.action,
             a.created_at, a.updated_at,
             COALESCE(a.created_by, '') AS created_by,
             COALESCE(a.updated_by, '') AS updated_by
      FROM accounts_approving a
      WHERE 1=1
      """;

  private static final RowMapper<AccountApproving> ROW_MAPPER = (rs, rowNum) -> {
    AccountApproving a = new AccountApproving();
    a.setId(rs.getLong("id"));
    a.setUsername(rs.getString("username"));
    a.setEmail(rs.getString("email"));
    a.setFullName(rs.getString("full_name"));
    String rolesStr = rs.getString("roles");
    if (rolesStr != null && !rolesStr.isBlank()) {
      a.setRoles(Arrays.stream(rolesStr.split(","))
          .map(String::trim)
          .filter(s -> !s.isEmpty())
          .map(Role::valueOf)
          .toList());
    }
    a.setStatus(rs.getString("status"));
    String statusApproving = rs.getString("status_approving");
    if (statusApproving != null) {
      a.setStatusApproving(AccountApprovingStatus.valueOf(statusApproving));
    }
    String action = rs.getString("action");
    if (action != null) {
      a.setAction(AccountApprovingAction.valueOf(action));
    }
    a.setCreatedAt(rs.getTimestamp("created_at") != null
        ? rs.getTimestamp("created_at").toLocalDateTime() : null);
    a.setUpdatedAt(rs.getTimestamp("updated_at") != null
        ? rs.getTimestamp("updated_at").toLocalDateTime() : null);
    a.setCreatedBy(rs.getString("created_by"));
    a.setUpdatedBy(rs.getString("updated_by"));
    return a;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<AccountApproving> search(String username, String fullName,
      List<String> statusApproving, String action, String fromDate, String toDate, Pageable pageable) {

    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder
        .andLike("a.username", "username", username, true, true)
        .andLike("a.full_name", "fullName", fullName, true, true)
        .andEqual("a.action", "action", action)
        .andGreaterOrEqual("a.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("a.updated_at", "toDate", DateParserUtils.parseTo(toDate));
    if (!statusApproving.isEmpty()) {
      builder.andIn("a.status_approving", "statusApproving", statusApproving);
    }

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
