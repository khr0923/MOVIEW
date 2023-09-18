import React from 'react';
import { Link } from 'react-router-dom'

export default function Sidebar() {
   <section className="sidebar">
      <ul>
        <li>마이페이지</li>
        <Link to ='/EditProfile'><li>회원정보 수정</li></Link>
        <Link to ='/MyComment'><li>리뷰 관리</li></Link>
      </ul>
    </section>
}