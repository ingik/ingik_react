# 이미지 기반 SNS

<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white"/>
<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/>
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/><br>

react를 너무 사용해보고 싶어서 토이프로젝트 느낌으로 제작하게 되었다.

현재 팔로워 및 팔로우 업데이트까지 완료된 상황 2022-03-03

게시물 업로드 페이지 전체수정 Preview로 인풋파일을 했을때 내가 올린 여러 사진들을 <br>
이미지 리스트로 보여주는데 이미지 리스트보다 기존 제작된 ImageBoard.js 페이지 느낌으로 <br>
직접 이미지를 넘겨서 확인하고 업로드 방식으로 수정할 예정
<br><br>

(전체수정 예정) 채팅 리프레시를 채팅 전체를 get해서 받아와 리렌더링을 해주고있는데<br>
(전체수정 예정) 불필요한 데이터를 가져와 렌더링에 손해를 보고있어서 수정이 필요할듯<br>
(채팅 및 dm socket부분은 전체적으로 수정하기로 결정함.. 오픈채팅으로 구현되어있지만 DM으로 전환)
<br><br>

profile update시 appbarcmp 에서 강제 리로딩 개선할 필요가 있음 --- 완료 <br>
profile 최적화 필요 --- 완료

<br>
리스트들 가상리스트 추가 시급 <br>
(react-window 가상리스트 라이브러리가 있지만 직접 구현 예정 무한스크롤로 앞에서 보여주고 <br> 데이터를 백단에서 쪼개서 넘겨줄지 고민중... )

<br><br>
api호출 내부 api호출 루프를 돌려버리니 골치아픈일이 발생 마지막 루프에 res 처리를 해주거나 <br>async.series를 사용하니 간단하게 해결됬다.

<br>
검색 preview 구현시 한글 자음부분에서 프리뷰가 끊기는현상 한글 전문 검색으로 변경필요 
 <br>
 
진행중 아쉬운 점
무계획으로 진행한 프로젝트다 보니 컴포넌트를 좀더 세분화 시킬수 있었는데<br>리액트의 강점을 하나도 못살린 느낌<br>
작은 컴포넌트로 빼서 기능과 css 추가해서 프롭스로 값만 넘겨주며 사용하니 너무 편하다<br>

오픈채팅을 dm으로 전환하고 푸쉬 알림기능 까지 마무리하면 리팩토링이 전체적으로 필요한 것 같다. <br>
첫 react 사용이었는데 배우면서 제작한다는 느낌이라 살을 붙이며 뼈대를 구성했지만 <br>
다음 프로젝트는 뼈대부터 잡고 살을 붙이며 진행할 수 있을 것 같다. 

컴포넌트 자체를 더 잘게 쪼개면 훨씬 더 간단하게 제작 할 수 있었는데 어느정도 진행 한 후에 느껴버렸다..
