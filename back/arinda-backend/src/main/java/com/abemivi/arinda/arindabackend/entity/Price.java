package com.abemivi.arinda.arindabackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Embeddable
public class Price {
    @Column(name = "monthlyrent", nullable = false)
    private int monthlyrent;

    @Column(name = "securitydeposit", nullable = false)
    private int securitydeposit;

    @Column(name = "appfee")
    private int appfee;

    @Column(name = "petfee")
    private int petfee;

    @Column(name = "advancerent")
    private int advancerent;

    public int getAdvancerentCost() {
        return advancerent * monthlyrent;
    }

    public int getTotalMoveinCost() {
        return monthlyrent + securitydeposit + appfee + petfee + getAdvancerentCost();
    }
}
