# Mapper Layer: No Annotations Used

This document describes the `mapper` layer in the Accounts microservice.

## Overview

The mapper layer is responsible for converting data between Data Transfer Objects (DTOs) and JPA Entities. This is a crucial best practice that decouples the API's external contract (the DTOs) from the internal database structure (the Entities).

In this microservice, the mapper layer consists of simple Java classes with `static` utility methods. These classes are not managed by Spring as beans, and therefore, they **do not use any Spring annotations** like `@Component` or `@Service`.

The logic is straightforward, manually setting fields from one object to another.

## `CustomerMapper.java`

This class handles the conversion between the `Customer` entity and the `CustomerDto`.

### Sample Code:

```java
package com.eazybytes.accounts.mapper;

import com.eazybytes.accounts.dto.CustomerDto;
import com.eazybytes.accounts.entity.Customer;

public class CustomerMapper {

    /**
     * Maps a Customer entity to a CustomerDto.
     */
    public static CustomerDto mapToCustomerDto(Customer customer, CustomerDto customerDto) {
        customerDto.setName(customer.getName());
        customerDto.setEmail(customer.getEmail());
        customerDto.setMobileNumber(customer.getMobileNumber());
        return customerDto;
    }

    /**
     * Maps a CustomerDto to a Customer entity.
     */
    public static Customer mapToCustomer(CustomerDto customerDto, Customer customer) {
        customer.setName(customerDto.getName());
        customer.setEmail(customerDto.getEmail());
        customer.setMobileNumber(customerDto.getMobileNumber());
        return customer;
    }
}
```

## `AccountsMapper.java`

This class handles the conversion between the `Accounts` entity and the `AccountsDto`.

### Sample Code:

```java
package com.eazybytes.accounts.mapper;

import com.eazybytes.accounts.dto.AccountsDto;
import com.eazybytes.accounts.entity.Accounts;

public class AccountsMapper {

    /**
     * Maps an Accounts entity to an AccountsDto.
     */
    public static AccountsDto mapToAccountsDto(Accounts accounts, AccountsDto accountsDto) {
        accountsDto.setAccountNumber(accounts.getAccountNumber());
        accountsDto.setAccountType(accounts.getAccountType());
        accountsDto.setBranchAddress(accounts.getBranchAddress());
        return accountsDto;
    }

    /**
     * Maps an AccountsDto to an Accounts entity.
     */
    public static Accounts mapToAccounts(AccountsDto accountsDto, Accounts accounts) {
        accounts.setAccountNumber(accountsDto.getAccountNumber());
        accounts.setAccountType(accountsDto.getAccountType());
        accounts.setBranchAddress(accountsDto.getBranchAddress());
        return accounts;
    }
}
```