package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.ApprovingStatus;
import com.g7auto.core.entity.EmployeeApprovalAction;
import com.g7auto.core.entity.EmployeeStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.core.utils.DateParserUtils;
import com.g7auto.domain.entity.EmployeeApproval;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class EmployeeApprovalQueryRepository {

  private static final String BASE_SQL = """
      SELECT ea.id, ea.full_name, ea.phone, ea.email, ea.address, ea.birth_date,
             ea.gender, ea.national_id, ea.join_date, ea.employee_status,
             ea.showroom_id, s.name AS showroom_name,
             ea.username,
             ea.employee_approval_action, ea.status_approving,
             ea.created_at, ea.updated_at, ea.created_by, ea.updated_by
      FROM employees_approving ea
      LEFT JOIN showrooms s ON ea.showroom_id = s.id
      WHERE 1=1
      """;

  private static final RowMapper<EmployeeApproval> ROW_MAPPER = (rs, rowNum) -> {
    EmployeeApproval ea = new EmployeeApproval();
    ea.setId(rs.getLong("id"));
    ea.setFullName(rs.getString("full_name"));
    ea.setPhone(rs.getString("phone"));
    ea.setEmail(rs.getString("email"));
    ea.setAddress(rs.getString("address"));
    ea.setBirthDate(
        rs.getDate("birth_date") != null ? rs.getDate("birth_date").toLocalDate() : null);
    ea.setGender(rs.getString("gender"));
    ea.setNationalId(rs.getString("national_id"));
    ea.setJoinDate(rs.getDate("join_date") != null ? rs.getDate("join_date").toLocalDate() : null);
    String status = rs.getString("employee_status");
    if (status != null) {
      ea.setEmployeeStatus(EmployeeStatus.valueOf(status));
    }

    long showroomId = rs.getLong("showroom_id");
    if (!rs.wasNull()) {
      ea.setShowroom_id(showroomId);
    }

    ea.setUsername(rs.getString("username"));

    String action = rs.getString("employee_approval_action");
    if (action != null) {
      ea.setEmployeeApprovalAction(EmployeeApprovalAction.valueOf(action));
    }

    String statusApproving = rs.getString("status_approving");
    if (statusApproving != null) {
      ea.setStatusApproving(ApprovingStatus.valueOf(statusApproving));
    }

    ea.setCreatedAt(
        rs.getTimestamp("created_at") != null ? rs.getTimestamp("created_at").toLocalDateTime()
            : null);
    ea.setUpdatedAt(
        rs.getTimestamp("updated_at") != null ? rs.getTimestamp("updated_at").toLocalDateTime()
            : null);
    ea.setCreatedBy(rs.getString("created_by"));
    ea.setUpdatedBy(rs.getString("updated_by"));
    return ea;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<EmployeeApproval> search(String fullName, Long showroomId, String action,
      String statusApproving, String fromDate, String toDate, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder
        .andLike("ea.full_name", "fullName", fullName, true, true)
        .andEqual("ea.showroom_id", "showroomId", showroomId)
        .andEqual("ea.employee_approval_action", "action", action)
        .andEqual("ea.status_approving", "statusApproving", statusApproving)
        .andGreaterOrEqual("ea.updated_at", "fromDate", DateParserUtils.parseFrom(fromDate))
        .andSmaller("ea.updated_at", "toDate", DateParserUtils.parseTo(toDate));

    return pagingJdbcExecutor.query(builder.getSql().toString(), builder.getParams(), pageable,
        ROW_MAPPER);
  }
}
