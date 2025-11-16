package com.abemivi.arinda.arindabackend.dto.support;

import lombok.Builder;

@Builder
public record ReviewSummary(
        Double averagerating,
        int totalreviews,
        int fivestarcount,
        int fourstarcount,
        int threestarcount,
        int twostarcount,
        int onestarcount
) {
}
