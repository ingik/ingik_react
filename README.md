# 이미지 기반 SNS (2021.12 ~ )

<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white"/>
<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/>
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/><br>
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon-S3&logoColor=white"/>

react를 너무 사용해보고 싶어서 토이프로젝트 느낌으로 제작하게 되었다.<br>

# http://3.36.133.116/

비밀번호는 암호화 후 db에 저장됩니다. <br>
형식에 맞춰서 회원가입 작성 해주시면 됩니다. <br>
인증 필요없습니다.<br>
모든 데이터는 30일 후 삭제됩니다.

# 수정이 필요한 부분 메모

테스팅중입니다. QA로 이관

1. 알림 ㅡ push알림 기능 socket 구조 변경필요 전체적으로 소켓서버를 사용할 예정인데 appbar에서 연결 하면 가능할 듯
2. 글작성이 안됨 ㅡ 완
3. 댓글 스페이스바 안눌림 ㅡ 완
4. 댓글작성만 눌러도 댓글이 올라감 ㅡ 완
5. 댓글삭제기능이 없음 ㅡ 완
6. 팔로우/팔로워 내역 ㅡ 진행중
7. 글 내역이 없으면 '작성된 글이 없습니다' 라고 떴음 좋겟음 ㅡ 완
8. 댓글단 사람도 프로필 볼 수 있게 ㅡ 컴포넌트는 제작 되어있다.
9. 프로필 보는 팝업 뜨는거 사라져요 궁씨 ㅡ 수정예정
10. 댓글 작성시 엔터치면 작성과함께 새로고침됨 ㅡ 완
11. 댓글 작성하면 댓글이 밀림 ㅡ 테스트 필요
12. 작성 시간이없음 ㅡ 계획 없음 
13. 채팅 유저추가를 할때 레이아웃 깨짐 현상 ㅡ 완
14. 회원가입 비밀번호가 잘못된 상태로 회원가입 진행 ㅡ 완 (정규식 추가)
15. s3 경로 수정 필요  ㅡ 완
16. 댓글과 좋아요 구조 변경 ㅡ 완
17. 프로필 변경 정규식 추가 필요 ㅡ 진행중
18. nginx 파일 크기 지정 해제 ㅡ 완
19. 댓글 구조 변경 필요 댓글에는 id값을 안넣어줬는데 delete시 어떤 댓글인지 식별불가 - 진행중
 
# 진행중 아쉬운 점<br>

무계획으로 진행한 프로젝트다 보니 컴포넌트를 좀더 세분화 시킬수 있었는데<br>리액트의 강점을 못살린 느낌<br>
작은 컴포넌트로 쪼개서 기능과 css 추가해서 프롭스로 값만 넘겨주며 사용하니 너무 편하다<br>

오픈채팅을 dm으로 전환하고 푸쉬 알림기능 까지 마무리하면 리팩토링이 전체적으로 필요한 것 같다. <br>
첫 react 사용이었는데 배우면서 제작한다는 느낌이라 살을 붙이며 뼈대를 구성했지만 <br>
다음 프로젝트는 뼈대부터 잡고 살을 붙이며 진행할 수 있을 것 같다. 

컴포넌트 자체를 더 잘게 쪼개면 훨씬 더 간단하게 제작 할 수 있었는데 어느정도 진행 한 후에 느껴버렸다.
대용량 트래픽이 발생시 어떻게 될지 궁금하기도 하다.

아쉽다.. 너무 아쉽다. 

