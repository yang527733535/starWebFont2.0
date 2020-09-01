import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { reqVideoById, reqVideoCommentById } from '@/services/video'
import ReactDOM from 'react-dom';
import { Typography, Tag, Comment, Avatar, Card, Divider } from 'antd'
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';

const { Title, Text, Link, Paragraph } = Typography;
import QierPlayer from 'qier-player';
const Index = ({ location }) => {
  const [] = useState(false);
  const [videoUrl, setvideoUrl] = useState(false);
  const [videoData, setvideoData] = useState({});
  const [commentData, setcommentData] = useState([]);
  useEffect(() => {




    const data = reqVideoById(location.query.id)

    data.then((res) => {
      console.log(res.data)
      const { url } = res.data.data
      setvideoData(res.data.data)
      setvideoUrl(url)
      console.log(videoUrl)

      // let player = document.querySelector('#player')
      // player.src = videoUrl

    })
  }, [videoUrl])

  useEffect(() => {
    //在这里获取评论
    const data = reqVideoCommentById(location.query.id)
    data.then((res) => {
      let myCommentData = res.data
      myCommentData = myCommentData?.map((item) => {
        if (item.comment_child.length === 0) {
          delete item.comment_child
          return item
        }
        return item
      })
      console.log(myCommentData)
      setcommentData(myCommentData)

    })
  }, [])

  function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  }
  console.log(videoData)
  const ExampleComment = ({ children, data },) => (

    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>Han Solo</a>}
      avatar={
        <Avatar
          src="https://ww2.sinaimg.cn/bmiddle/77b685fbgy1ggpplb1phtj20u00u0wid.jpg"
          alt="Han Solo"
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


  );

  const GetCommentTree = (data) => {

    return data?.map((item) => {
      if (item.comment_child) {
        return (
          <ExampleComment
            data={item}
          >
            {GetCommentTree(item.comment_child)}
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

    // const renderTreeNodes = (data) =>
    // data.map((item) => {
    //   if (item.children) {
    //     return (
    //       <TreeNode title={item.name} key={item.id}>
    //         {renderTreeNodes(item.children)}
    //       </TreeNode>
    //     );
    //   }
    //   return <TreeNode key={item.id} title={item.name} />;
    // });




  }
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

        <Card style={{ width: 742 }}>
          {
            GetCommentTree(commentData)
          }
        </Card>



      </div>
    </div>

    <div className={styles.mybox_rigth}>
      Rigth
    </div>
  </div>
};
export default Index;