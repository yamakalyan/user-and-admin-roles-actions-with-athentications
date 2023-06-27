import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const roleKey = localStorage.getItem("role");
  const [dataList, setDataList] = useState([]);

  // TOTAL METHOD USING API 

  // const [totalValueQuantity, setTotalvalueQuantity] = useState(0)
  // const [totalValueWeight, setTotalvalueWeight] = useState(0)
  // const [totalValueBox, setTotalvalueBox] = useState(0)

  const navigator = useNavigate();

  useEffect(() => {
    const fetchingList = async () => {
      const options = {
        method: "get",
        headers: { "Content-Type": "application/json", role: roleKey },
      };
      await fetch("https://userroles.onrender.com/data/", options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDataList(data.listResults);
          } else {
            setDataList(data.listResults);
          }
        });
    };
    return () => fetchingList();
  }, []);

  const mappingQuantity = dataList?.map((list, l) => {
    return (
      <>
       <td key={l}>{list.details[0].quantity}</td>
      </>
    );
  });
  const mappingWeight = dataList?.map((list, l) => {
    return (
      <>
       <td key={l}>{list.details[0].weightResults[0].weight}</td>
      </>
    );
  })
  const mappingBoxCount = dataList?.map((list, l) => {
    return (
      <>
       <td key={l}>{list.details[0].boxResults[0].boxcount}</td>
      </>
    );
  });


  // NOTE :

  // HERE WE HAVE BOTH WAYS TO TOTALQUANTITY, WEIGHT AND BOXCOUNT

  // FIRST ONE USING REDUCE METHOD LIKE BELOW

  const totalQuantity = dataList.reduce((quantity, list)=>{

    return list.details[0].quantity + quantity
  }, 0)

  const totalweight = dataList.reduce((weight, list)=>{

    return list.details[0].weightResults[0].weight + weight
  }, 0)

  const totalBoxCount = dataList.reduce((box, list)=>{

    return list.details[0].boxResults[0].boxcount + box
  }, 0)


  
  // NOTE :

  // SECOND ONE USING FECTH FROM BACKEND CALCULATIONS LIKE BELOW


  // please read carefully

  // while activating this hook please comment out states also, and values will be shown on console.log


  // useEffect(() => {
  //   const fetchingList = async () => {
  //     const options = {
  //       method: "get",
  //       headers: { "Content-Type": "application/json", role: roleKey },
  //     };
  //     await fetch("http://localhost:3200/data/count", options)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.success) {
  //           setTotalvalueBox(data.boxcount)
  //           setTotalvalueQuantity(data.quantity)
  //           setTotalvalueWeight(data.weight)
  //         } else {
  //           setTotalvalueBox(data.boxcount)
  //           setTotalvalueQuantity(data.quantity)
  //           setTotalvalueWeight(data.weight)
  //         }
  //       });
  //   };
  //   return () => fetchingList();
  // }, []);

  // console.log(totalValueQuantity)
  // console.log(totalValueWeight)
  // console.log(totalValueBox)

  const handleLogOut = () => {
    localStorage.removeItem("role");
    navigator("/");
    window.location.reload(false);
  };

  return (
    <div>
      <div className="container ">
        <div className="text-end">
          <button className="btn btn-primary" onClick={handleLogOut}>
            Log-out
          </button>
        </div>
        <div className="row mt-5">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">item / Customer</th>
                <th scope="col">Customer1</th>
                <th scope="col">Customer2</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">Quantity</th>
                {mappingQuantity}
                <td>{totalQuantity}</td>
                
              </tr>
              <tr>
                <th scope="row">Weight</th>
                {
                  mappingWeight
                }
                <td>{totalweight}</td>
              </tr>
              <tr>
                <th scope="row">Box Count</th>
                {
                  mappingBoxCount
                }
                <td>{totalBoxCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <span>devoloped by <a className="mt-5" href="https://yamakalyan3120.web.app" target="_blanck">yama kalyan</a></span>

    </div>
  );
}
