package com.g7auto.application.dto.response;

import java.util.List;

public record CarImportResultResponse(int success, int failed, List<String> errors) {

}
