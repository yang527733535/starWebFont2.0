import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { reqVideoById, reqVideoCommentById, reqUserDataById } from '@/services/video'
import ReactDOM from 'react-dom';
import { Typography, Tag, Comment, Avatar, Card, Divider, Pagination } from 'antd'
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';

const { Title, Text, Link, Paragraph } = Typography;
import QierPlayer from 'qier-player';
const Index = ({ location }) => {
  const [] = useState(false);
  const [videoUrl, setvideoUrl] = useState(false);
  const [videoData, setvideoData] = useState({});
  const [commentData, setcommentData] = useState([]);
  const [totolCount, settotolCount] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  const [cardLoading, setcardLoading] = useState(false);
  useEffect(() => {
    const data = reqVideoById(location.query.id)
    data.then((res) => {
      console.log(res.data)
      const { url } = res.data.data
      setvideoData(res.data.data)
      setvideoUrl(url)
      console.log(videoUrl)
    })
  }, [])

  useEffect(() => {
    //在这里获取评论
    const pageData = {
      pagesize: 4,
      pagenum: 1
    }
    setcardLoading(true)
    const data = reqVideoCommentById(location.query.id, pageData)
    data.then((res) => {
      let myCommentData = res.data
      settotolCount(res.count)
      // myCommentData = myCommentData?.map((item) => {
      //   if (item.comment_child.length === 0) {
      //     delete item.comment_child
      //     return item
      //   }
      //   return item
      // })
      setcardLoading(false)
      setcommentData(myCommentData)
    })
  }, [])

  function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  }
  const ExampleComment = ({ children, data }) => {
    return (
      <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>{data.comment_user_name}</a>}
        avatar={
          <Avatar
            src="https://ww2.sinaimg.cn/bmiddle/77b685fbgy1ggpplb1phtj20u00u0wid.jpg"
            alt="Username"
          />
        }
        content={
          <p>
            {data.content}
          </p>
        }
      >
        {children}
      </Comment>
    )
  }

  const GetCommentTree = (data) => {
    return data?.map((item) => {
      if (item.child_comment) {
        return (
          <ExampleComment
            data={item}
          >
            {GetCommentTree(item.child_comment)}
          </ExampleComment>

        )
      }
      return (
        <div>
          <ExampleComment
            data={item}
          ></ExampleComment>
          <Divider />
        </div>
      )



    })


  }
  const onChange = page => {
    console.log(page);
    setcurrentpage(page)
    const pageData = {
      pagesize: 4,
      pagenum: page
    }
    setcardLoading(true)
    const data = reqVideoCommentById(location.query.id, pageData)
    data.then((res) => {
      let myCommentData = res.data
      settotolCount(res.count)
      // myCommentData = myCommentData?.map((item) => {
      //   if (item.comment_child.length === 0) {
      //     delete item.comment_child
      //     return item
      //   }
      //   return item
      // })
      setcardLoading(false)
      setcommentData(myCommentData)
    })


  };

  return <div className={styles.mybox}>
    <div className={styles.mybox_left}>
      <Title level={4}>{videoData.title}</Title>
      <div style={{ marginBottom: 10 }}>
        {/* tag
       */}
        {videoData.tag && videoData.tag.map((item) => {
          return <Tag color="magenta">{item.name}</Tag>
        })}

        <span className={styles.createTime}>创建时间:{getLocalTime(videoData.created_at)}</span>
      </div>
      <QierPlayer srcOrigin={videoUrl} />
      <div style={{ marginTop: 15 }}>
        <Card
          loading={cardLoading}
          style={{ width: 742 }}>
          {
            GetCommentTree(commentData)
          }
          <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
            <Pagination
              pageSize={4}
              current={currentpage}
              onChange={onChange}
              total={totolCount} />
          </div>

        </Card>
      </div>
    </div>

    <div className={styles.mybox_rigth}>
      Rigth
    </div>
  </div>
};
export default Index;