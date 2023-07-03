-- Answer 4.1
SELECT * FROM STORE WHERE Region="East";

-- Answer 4.2
SELECT PRODUCT.* FROM PRODUCT
JOIN SALES_FACT ON PRODUCT.Product_key = SALES_FACT.Product_key
JOIN STORE ON STORE.Store_key = SALES_FACT.Store_key
WHERE STORE.City = 'New York';

-- Answer 4.3
SELECT SUM(SALES_FACT.Profit) 
FROM SALES_FACT 
JOIN STORE ON STORE.Store_key = SALES_FACT.Store_key 
WHERE STORE.City ="New York";

-- Answer 4.4
DELETE FROM SALES_FACT
WHERE Product_key IN (
  SELECT Product_key
  FROM PRODUCT
  WHERE brand = 'Wolf'
);

-- Answer 4.5
UPDATE PRODUCT
SET Brand = 'W'
WHERE Description = "Toy Story";