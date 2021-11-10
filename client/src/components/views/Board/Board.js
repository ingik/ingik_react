import React from 'react'

function Board() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100vh'}}>
            

            <div>   
                <div><h2>게시판</h2></div>
            <table border="1">
    <tr>
        <td>번호</td>
        <td>작성자</td>
        <td>제목</td>
        <td>조회수</td>
        <td>수정일</td>
        <td>등록일</td>
    </tr>
   
    <tr>
        <td></td>
        <td></td>
        <td><a></a></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>


            
            </div>
        </div>
    )
}

export default Board
