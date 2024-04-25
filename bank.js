class BankAccount {
    constructor(accountNumber, ownerName, initialBalance = 0) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = initialBalance;
    }
  
    deposit(amount) {
        if (amount < 0) {
            throw new Error("Deposit amount must be positive");
            
        }
        this.balance += amount;
    }
  
    withdraw(amount) {
        if (amount < 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (this.balance < amount) {
            throw new Error("Insufficient funds");
        }
        this.balance -= amount;
    }
  
    transfer(targetAccount, amount) {
        try {
            this.withdraw(amount);
            targetAccount.deposit(amount);
        } catch (error) {
            console.error(`Transfer failed: ${error.message}`);
            // Optionally re-throw the error if you need to notify the caller
            throw new Error("Transfer operation failed");
        }
    }
  }
  
  function handleTransactions() {
    let myAccount = new BankAccount(101, "Steve Rich", 500);
    let friendAccount = new BankAccount(102, "Bessie Owens", 300);
  
    try {
        myAccount.deposit(100);
        // changes the friendAccount's owner name. Makes sense cos instead of calling the generic "owner name", you call the specific name you assigned!!
        friendAccount.ownerName = "Tajah"
        myAccount.transfer(friendAccount, 700);  // This should fail
    } catch (error) {
        console.error(`Operation failed: ${error.message}. Transfer to ${friendAccount.ownerName} failed`); // shows that i have changed the friendAccount name
    }
  
    console.log(`Account Balance (Steve Rich): $${myAccount.balance}`);
    console.log(`Account Balance (${friendAccount.ownerName}): $${friendAccount.balance}`);
  }
  
  handleTransactions();