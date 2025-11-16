package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Embeddable
public class Price {
    @Column(nullable = false)
    private int monthrent;

    @Column(nullable = false)
    private int securitydeposit;

    private int appfee;
    private int petfee;

    @Column(nullable = false)
    private int advancerent;

    public int getAdvancerentCost() {
        return advancerent * monthrent;
    }

    public int getTotalMoveinCost() {
        return monthrent + securitydeposit + appfee + petfee + getAdvancerentCost();
    }
}
