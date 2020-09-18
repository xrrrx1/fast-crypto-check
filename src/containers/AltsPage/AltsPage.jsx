import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { CoinsContext } from "../../context/context";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AltsPage = () => {
  const { store, fetchData } = useContext(CoinsContext);
  console.log("store hasData", store.hasData);
  console.log("coins", store.coins);

  const [filterText, setFilterText] = useState("");

  const data =
    store.hasData === true &&
    store.coins
      .filter((item) => item.pm === "ALTS")
      .map((value) => ({
        default: value,
        pairs: `${value.b}/${value.q}`,
        latestPrice: value.c.toFixed(8),
        change: ((value.c / value.o - 1) * 100).toFixed(2),
      }));

  console.log("data", data);

  const filteredItems =
    store.hasData === true &&
    data.filter((item) =>
      item.pairs.toLowerCase().includes(filterText.toLowerCase())
    );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filter By Name"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </>
  );

  const columns = [
    {
      name: "Pair",
      selector: "pairs",
      sortable: true,
      style: {
        color: "white",
        backgroundColor: "black",
      },
    },
    {
      name: "Last price",
      selector: "latestPrice",
      sortable: true,
      style: {
        color: "white",
        backgroundColor: "black",
      },
    },
    {
      name: "Change",
      selector: "change",
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.change < 0,
          style: {
            color: "rgb(248, 73, 96)",
            backgroundColor: "black",
          },
        },
        {
          when: (row) => row.change >= 0,
          style: {
            color: "rgb(2, 192, 118)",
            backgroundColor: "black",
          },
        },
      ],
    },
  ];

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  return (
    store.hasData === true && (
      <DataTable
        title="ALTS"
        columns={columns}
        data={filteredItems}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
      />
    )
  );

  // return (
  //   <div>
  //     <Title>BTC</Title>
  //     {store.hasData === true &&
  //       store.coins.map(
  //         (d) =>
  //           d.pm === "BTC" && (
  //             <Container key={d.an + d.as}>
  //               <p>
  //                 {d.b}/{d.q} latest price {d.c.toFixed(8)} change
  //               </p>
  //               {(d.c / d.o - 1) * 100 >= 0 ? (
  //                 <HigherThanStart>
  //                   {((d.c / d.o - 1) * 100).toFixed(2)}{" "}
  //                   {(d.c / d.o - 1) * 100 > 0}
  //                 </HigherThanStart>
  //               ) : (
  //                 <LowerThanStart>
  //                   {((d.c / d.o - 1) * 100).toFixed(2)}{" "}
  //                   {(d.c / d.o - 1) * 100 > 0}
  //                 </LowerThanStart>
  //               )}
  //             </Container>
  //           )
  //       )}
  //   </div>
  // );
};

export default AltsPage;
