package com.g7auto.infrastructure.persistence.query;

import com.g7auto.core.entity.PaymentMethod;
import com.g7auto.core.entity.PaymentStatus;
import com.g7auto.core.sql.DynamicSqlBuilder;
import com.g7auto.core.sql.PagingJdbcExecutor;
import com.g7auto.domain.entity.Contract;
import com.g7auto.domain.entity.Employee;
import com.g7auto.domain.entity.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PaymentQueryRepository {

  private static final String BASE_SQL = """
      SELECT p.id,
             p.contract_id, c.contract_number,
             p.installment_number, p.amount, p.payment_time,
             p.method, p.status,
             p.collector_id, e.full_name AS collector_name,
             p.transaction_code, p.notes, p.created_at
      FROM payments p
      LEFT JOIN contracts c ON p.contract_id = c.id
      LEFT JOIN employees e ON p.collector_id = e.id
      WHERE 1=1
      """;

  private static final RowMapper<Payment> ROW_MAPPER = (rs, rowNum) -> {
    Payment p = new Payment();
    p.setId(rs.getLong("id"));

    long contractId = rs.getLong("contract_id");
    if (!rs.wasNull()) {
      Contract contract = new Contract();
      contract.setId(contractId);
      contract.setContractNumber(rs.getString("contract_number"));
      p.setContract(contract);
    }

    p.setInstallmentNumber(rs.getInt("installment_number"));
    p.setAmount(rs.getBigDecimal("amount"));
    p.setPaymentTime(rs.getTimestamp("payment_time") != null
        ? rs.getTimestamp("payment_time").toLocalDateTime() : null);

    String method = rs.getString("method");
    if (method != null) {
      p.setMethod(PaymentMethod.valueOf(method));
    }
    String status = rs.getString("status");
    if (status != null) {
      p.setStatus(PaymentStatus.valueOf(status));
    }

    long collectorId = rs.getLong("collector_id");
    if (!rs.wasNull()) {
      Employee collector = new Employee();
      collector.setId(collectorId);
      collector.setFullName(rs.getString("collector_name"));
      p.setCollector(collector);
    }

    p.setTransactionCode(rs.getString("transaction_code"));
    p.setNotes(rs.getString("notes"));
    p.setCreatedAt(rs.getTimestamp("created_at") != null
        ? rs.getTimestamp("created_at").toLocalDateTime() : null);
    return p;
  };

  private final PagingJdbcExecutor pagingJdbcExecutor;

  public Page<Payment> search(String status, Long contractId, Pageable pageable) {
    DynamicSqlBuilder builder = new DynamicSqlBuilder(BASE_SQL);
    builder.andEqual("p.status", "status", status)
        .andEqual("p.contract_id", "contractId", contractId);
    return pagingJdbcExecutor.query(builder.getSql().toString(), builder.getParams(), pageable,
        ROW_MAPPER);
  }
}
