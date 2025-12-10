package com.abemivi.arinda.arindabackend.dto.tenant;

import com.abemivi.arinda.arindabackend.entity.enums.PaymentStatus;

import jakarta.validation.constraints.NotNull;

public record UpdatePaymentStatusRequest(
        @NotNull(message = "Payment status is required")
        PaymentStatus paymentStatus
) {}
