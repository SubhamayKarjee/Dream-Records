import axios from "axios";
// import { useState } from "react";

// eslint-disable-next-line react/prop-types
const PaymentDetails = ({id}) => {
    // Paginatin and Search State __________________________________________________
    // const [totalItems, setTotalItems] = useState();
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemPerPage, setItemPerPage] = useState(10);
    // const [fetchLoading, setFetchLoading] = useState(false)
    
    console.log(id);

    axios.get(`http://localhost:5000/common/api/v1/payment/${id}?page=1&limit=10`)
    .then(res => {
        console.log(res.data.data);
    })
    return (
        <div>
            
        </div>
    );
};

export default PaymentDetails;