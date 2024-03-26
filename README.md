## Telephone:
Написал атакующий контракт [TelephoneDrop](./contracts/TelephoneDrop.sol).
Там все просто: вызываем исходный контракт.
Тестировал все на локальной ноде. Дописал в [тест](./test/Telephone.test.js) все вызовы

Как проверить?

- `npx hardhat compile`
- `npx hardhat node`
- `jest --testRegex Telephone.test.js`


## TimeZone
Написал атакующую библиотеку [TimeZoneDrop](./contracts/TimeZoneDrop.sol).
Там все просто: делаем два слота в памяти, чтобы подменить потом owner-а.
Написал код в [тесте](./test/TimeZone.test.js).


Как проверить?

- `npx hardhat compile`
- `npx hardhat node`
- `jest --testRegex TimeZone.test.js`

## Bank
Тут наглядный и очевидный reentrancy в методе withdraw_with_bonus у исходного контракта.
Написал простой атакующий контракт [BankDrop](./contracts/BankDrop.sol) и также немного модифицировал исходный
чтобы получать адрес директора из вне. 

Весь взлом делается в три простых шага:
1. Вызываем addBalance из _атакующего_ контракта и пополняем баланс
2. Вызываем giveBonusToUser _исходного_ контракта и указываем в качестве аргумента адресс _атакующего_ контракта
3. Запускаем reentrancy с помощью вызова withdraw_with_bonus у _атакующего_ контракта 

Написал код в [тесте](./test/Bank.test.js).

Как проверить?

- `npx hardhat compile`
- `npx hardhat node`
- `jest --testRegex Bank.test.js`