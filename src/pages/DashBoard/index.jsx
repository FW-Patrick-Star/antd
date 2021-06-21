import React, { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { fetchDashBoard } from '@/services/dashboard';


function DashBoard() {

  const [index, setIndex] = useState({})

  useEffect (() => {
    async function fetchDash() {
      const resIndex = await fetchDashBoard();
      setIndex(resIndex);
    }
    fetchDash();
  }, [])


  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数"
              value={index.users_count}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数"
              value={index.goods_count}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
  
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数"
              value={index.order_count}
              precision={0}
              valueStyle={{ color: '#234abc' }}
  
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashBoard;