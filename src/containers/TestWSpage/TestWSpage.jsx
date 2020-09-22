import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  color: black;
`;

const FlexContainer = styled.div`
  display: flex;
`;

let ws = new WebSocket(
  "wss://stream.binance.com/stream?streams=!miniTicker@arr"
);

const TestWSpage = () => {
  const [data, setData] = useState([]);

  const dataForUse = data.map((values) => ({
    ...values,
  }));

  console.log("dataForUse", dataForUse);

  ws.onmessage = (evt) => {
    try {
      let msgs = JSON.parse(evt.data);
      setData(msgs.data);
    } catch (e) {
      console.log("Err message: " + evt.data, e);
    }
  };

  useEffect(() => {
    ws.onopen = () => {
      console.log("Wss connected...");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Container>
        {dataForUse.map((item) => (
          <FlexContainer>
            <p key={item.E}>
              {item.s} {item.v}
            </p>
          </FlexContainer>
        ))}
      </Container>
    </div>
  );
};

export default TestWSpage;
