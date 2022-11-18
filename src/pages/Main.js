import axios from "axios";
import HeadLayout from "components/layouts/HeadLayout";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  // QueryString
  const { search } = useLocation();
  // const queryString = useMemo(() => new URLSearchParams(search), [search]);

  const [attrs, setAttrs] = useState([]);

  const navigate = useNavigate();

  // pageNo는 재활용되므로 코드 추가
  const getPageNo = useMemo(()=>{
    const queryString = new URLSearchParams(search);
    let pageNo = "1";
    if(queryString.get("pageNo") != null &&
      !isNaN(queryString.get("pageNo"))
    ) {
      pageNo = queryString.get("pageNo");  // 어차피 주소(문자)를 보내므로 숫자로 바꿀 필요 없다. 
    }
    return pageNo;
  },[search]);

  const getAttrs = () => {
    axios
    .get(`https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=hyoIULZ88PwumdTwE1QtyLqAJk%2BjALZVCkgdEZDEeRtW2ORIERBpnmJzo2gG%2F0wckQYz8tuDq3drlrOa9hv2rQ%3D%3D&pageNo=${getPageNo}&numOfRows=10&resultType=json`)
    .then((response)=>{
      console.log(response.data.getAttractionKr.item);
      setAttrs(response.data.getAttractionKr.item);
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{});

  };

  useEffect(()=>{
    // console.log(queryString.get("pageNo"));
    // console.log(isNaN(queryString.get("pageNo")));  // 숫자형인지 아닌지 확인
    getAttrs(); // getAttrs 실행
  }, [getPageNo])

  return (
    <HeadLayout>
      <div>
        <div>메인페이지</div>
        {/* <div>{queryString.get("pageNo")}</div> */}
        <Container>
          <Row>
            <Col>
              <Button className="me-3" variant="danger" onClick={()=> navigate(`/?pageNo=${parseInt(getPageNo)-1}`)}>Prev</Button>
              <Button variant="danger" onClick={()=> navigate(`/?pageNo=${parseInt(getPageNo)+1}`)}>Next</Button>
            </Col>
            <Col>
              
            </Col>
          </Row>
          <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
            {attrs.map((value, index)=>{
              return (
              <Col key={index}>
                {/* {value.MAIN_TITLE} */}
                <Card className="mb-5">
                  <Card.Img variant="top" src={value.MAIN_IMG_THUMB} />
                  <Card.Body>
                    <Card.Title>{value.MAIN_TITLE}</Card.Title>
                    <Card.Text style={{ height: "100px", overflow: "hidden"}}>
                      {value.ITEMCNTNTS}
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate(`/counter/${value.UC_SEQ}`)}>자세히 보기</Button>
                  </Card.Body>
                </Card>
              </Col>
              );
            })}
          </Row>
        </Container>
        <button onClick={() => navigate("/counter")}>카운터로 이동</button>
      </div>
    </HeadLayout>
  );
};

export default Main;
