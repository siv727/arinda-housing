package com.abemivi.arinda.arindabackend.dto.support;

import lombok.Builder;

@Builder
public record PricingDetails(
        int monthlyrent,
        int securitydeposit,
        Integer appfee,
        Integer petfee,
        Integer advancerent,
        Integer advancerentcost,
        int totalmoveincost) {
}
