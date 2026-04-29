package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.AccountStatus;
import com.g7auto.core.entity.Role;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.Account;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccountQueryRepository {

  private static final String BASE_SQL = """
      SELECT u.id, u.full_name, u.username, u.email, u.roles, u.status,
             u.failed_login_attempts,
             u.created_at, u.updated_at,
             COALESCE(u.created_by, '') AS created_by,
             COALESCE(u.updated_by, '') AS updated_by
      FROM accounts u
      WHERE 1=1
      """;

  private static final RowMapper<Account> ROW_MAPPER = (rs, rowNum) -> {
    Account account = new Account();
    account.setId(rs.getLong("id"));
    account.setFullName(rs.getString("full_name"));
    account.setUsername(rs.getString("username"));
    account.setEmail(rs.getString("email"));
    String rolesStr = rs.getString("roles");
    if (rolesStr != null && !rolesStr.isBlank()) {
      account.setRoles(Arrays.stream(rolesStr.split(","))
          .map(String::trim)
          .filter(s -> !s.isEmpty())
          .map(Role::valueOf)
          .toList());
    }
    String status = rs.getString("status");
    if (status != null) {
      account.setStatus(AccountStatus.valueOf(status));
    }
    account.setFailedLoginAttempts(rs.getInt("failed_login_attempts"));
    account.setCreatedAt(rs.getTimestamp("created_at") != null
        ? rs.getTimestamp("created_at").toLocalDateTime() : null);
    account.setUpdatedAt(rs.getTimestamp("updated_at") != null
        ? rs.getTimestamp("updated_at").toLocalDateTime() : null);
    account.setCreatedBy(rs.getString("created_by"));
    account.setUpdatedBy(rs.getString("updated_by"));
    return account;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<Account> search(String username, String fullName,
      String fromDate, String toDate, Pageable pageable) {

    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andLike("u.username", "username", username, true, true)
        .andLike("u.full_name", "fullName", fullName, true, true)
        .andGreaterOrEqual("u.updated_at", "fromDate",
            DateParserUtils.parseFrom(fromDate))
        .andSmaller("u.updated_at", "toDate",
            DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(
        builder.getSql().toString(),
        builder.getParams(),
        pageable,
        ROW_MAPPER
    );
  }
}
