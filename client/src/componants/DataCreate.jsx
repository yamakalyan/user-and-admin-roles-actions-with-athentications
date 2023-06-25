import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DataCreate() {
  const roleKey = localStorage.getItem("role")
    const [create, setCreate] = useState("")
    const [date, setDate] = useState("")
    const [company, setCompany] = useState("")
    const [Owner, setOwner] = useState("")
    const [item, setItem]= useState("")
    const [Quantity, setQuantity] = useState("")
    const [weight, setweight] = useState("")
    const [reqShipment, setReqShipment] = useState("")
    const [trackingId, setTrackingId] = useState("")
    const [shipmentSize, setShipmentSize] = useState("")
    const [boxCount, setBoxCount] = useState("")
    const [specifications, setSpecifications] = useState("")
    const [checkList, setChecklist] = useState("")


    const navigator = useNavigate()

 const handleCreate =(e)=>{
  e.preventDefault()
   
    const options ={
        method : "post",
        headers : {"Content-Type" : "application/json", "role" : roleKey},
        body : JSON.stringify({
          customer_id: roleKey,
          order_date: date,
          company: company,
          owner: Owner,
          item: item,
          quantity: Quantity,
          weight: weight,
          req_shipment: reqShipment,
          tracking_id: trackingId,
          shipment_size: shipmentSize,
          boxCount: boxCount,
          specification: specifications,
          check_list_qunatity: checkList
        }) 
    }
     fetch("http://localhost:3200/data/create", options)
    .then(res =>res.json())
    .then(data =>{
        if (data.success) {
            setCreate(data.message)
        } else {
            setCreate(data.message)

        }
    })
 }

    const handleLogOut =()=>{
      localStorage.removeItem("role")
      navigator("/")
      window.location.reload(false)
    }

  return (
    <div className="container mt-5" id="DataCreate">
      <div>
        {
          create && <h1>{create}</h1>
        }
      </div>
      <div className="text-end">
        <button className="btn btn-primary" onClick={handleLogOut}>Log-out</button>
      </div>
        <form onSubmit={handleCreate}>
      <div className="row mt-5">

        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter order date
            </label>
            <input
              type="date"
              className="form-control"
              required
              onChange={(e)=>setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter Company name
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Ex : Abc123"
              pattern="[a-zA-Z0-9\s]+"
              onChange={(e)=>setCompany(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter Owner name
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Ex : Name123"
              pattern="[a-zA-Z0-9\s]+"
              onChange={(e)=>setOwner(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter Item name
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Item name"
              onChange={(e)=>setItem(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter Quantity
            </label>
            <input
              type="number"
              className="form-control"
              required
              placeholder="Enter quantity"
              onChange={(e)=>setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter Weight
            </label>
            <input
              type="number"
              className="form-control"
              required
              placeholder="Enter weight"
              step="0.01"
              onChange={(e)=>setweight(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Request for shipment
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Request"
              onChange={(e)=>setReqShipment(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Tracking Id
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Tracking id"
              onChange={(e)=>setTrackingId(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter Shipment size
            </label>
            <input
              type="number"
              className="form-control"
              required
              placeholder="Shipment size"
              onChange={(e)=>setShipmentSize(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter box count
            </label>
            <input
              type="number"
              className="form-control"
              required
              placeholder="box count"
              onChange={(e)=>setBoxCount(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Enter Specifications
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Specifications"
              onChange={(e)=>setSpecifications(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Checklist Quantity
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="checklist quantity"
              onChange={(e)=>setChecklist(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
            Submit
          </button>
      </div>
        </form>

      <span>devoloped by <a className="mt-5" href="https://yamakalyan3120.web.app" target="_blanck">yama kalyan</a></span>

    </div>
  );
}
