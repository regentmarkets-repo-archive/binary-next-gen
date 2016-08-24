### 1. Upgrade from VRTC to CR/MLT

API:       https://developers.binary.com/api/#new_account_real
Condition: user does not have real account

### 2. Upgrade from VRTC/MLT to MF

API:        https://developers.binary.com/api/#new_account_maltainvest
Condition:
* user is not using MF account, identified by landing_company !== 'maltainvest'
* user country allow MF, identified by landing_company response contains financial company

### 3. Upgrade from VRTC to MLT
API:       https://developers.binary.com/api/#new_account_real
Condition:
* user does not have real account
* user country allow MLT, identified by landing_company response contains gaming company
