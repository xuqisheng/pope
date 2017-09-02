package com.pope.contract.entity.custom;

import java.io.Serializable;
import java.math.BigDecimal;

public class CustomMoneyLog implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String wid;

    private String customId;

    private String accountNumber;

    private String bankAccount;

    private BigDecimal accountMoney;

    private BigDecimal bdMoney;

    private String createTime;

    private String createMan;

    public String getWid() {
        return wid;
    }

    public void setWid(String wid) {
        this.wid = wid == null ? null : wid.trim();
    }

    public String getCustomId() {
        return customId;
    }

    public void setCustomId(String customId) {
        this.customId = customId == null ? null : customId.trim();
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber == null ? null : accountNumber.trim();
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount == null ? null : bankAccount.trim();
    }

    public BigDecimal getAccountMoney() {
        return accountMoney;
    }

    public void setAccountMoney(BigDecimal accountMoney) {
        this.accountMoney = accountMoney;
    }

    public BigDecimal getBdMoney() {
        return bdMoney;
    }

    public void setBdMoney(BigDecimal bdMoney) {
        this.bdMoney = bdMoney;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime == null ? null : createTime.trim();
    }

    public String getCreateMan() {
        return createMan;
    }

    public void setCreateMan(String createMan) {
        this.createMan = createMan == null ? null : createMan.trim();
    }
}