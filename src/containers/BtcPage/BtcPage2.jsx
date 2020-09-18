import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { CoinsContext } from "../../context/context";

const Title = styled.h2`
  color: red;
`;

const Container = styled.div`
  display: flex;
`;

const HigherThanStart = styled.p`
  color: green;
`;

const LowerThanStart = styled.p`
  color: red;
`;
const BtcPage = () => {
  const { store, fetchData } = useContext(CoinsContext);
  console.log("store hasData", store.hasData);
  console.log("coins", store.coins);

  store.hasData === true
    ? console.log(store.coins.map((item) => item.pm === "BTC" && item))
    : console.log("data not ready");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Title>BTC</Title>
      {store.hasData === true &&
        store.coins.map(
          (d) =>
            d.pm === "BTC" && (
              <Container key={d.an + d.as}>
                <p>
                  {d.b}/{d.q} latest price {d.c.toFixed(8)} change
                </p>
                {(d.c / d.o - 1) * 100 >= 0 ? (
                  <HigherThanStart>
                    {((d.c / d.o - 1) * 100).toFixed(2)}{" "}
                    {(d.c / d.o - 1) * 100 > 0}
                  </HigherThanStart>
                ) : (
                  <LowerThanStart>
                    {((d.c / d.o - 1) * 100).toFixed(2)}{" "}
                    {(d.c / d.o - 1) * 100 > 0}
                  </LowerThanStart>
                )}
              </Container>
            )
        )}
    </div>
  );
};

export default BtcPage;
