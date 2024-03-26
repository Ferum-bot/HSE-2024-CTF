## Telephone:
Написал атакующий контракт [TelephoneDrop](./contracts/TelephoneDrop.sol).
Там все просто: вызываем исходный контракт.
Тестировал все на локальной ноде. Дописал в [тест](./test/Telephone.test.js) все вызовы

Как проверить?

- `npx hardhat compile`
- `npx hardhat node`
- `jest --testRegex Telephone.test.js`


## TimeZone
Написал атакующую библиотеку [TimeZoneDrop](./contracts/TimeZoneDrop.sol)
Там все просто: делаем два слота в памяти, чтобы подменить потом owner-а
Написал код в [тесте](./test/TimeZone.test.js)


Как проверить?

- `npx hardhat compile`
- `npx hardhat node`
- `jest --testRegex TimeZone.test.js`