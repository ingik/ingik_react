# Snap Story (2021.12 ~ )

<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>
<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white"/>
<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/>
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/><br>
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon-S3&logoColor=white"/>
<img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>

# 개요

이미지 기반 SNS 웹앱 <br>
react를 너무 사용해보고 싶어서 토이프로젝트 느낌으로 제작<br>
클론코딩이냐고 물어보시는 분들이 있으신데 아닙니다.. SNS에서 돌아다니면서 이 기능 저 기능 따라 구현해 본겁니다.<br>
그냥 인스타처럼 이미지SNS를 만들어보고 싶어! 라는 생각으로 제작한 프로젝트이고 <br>
직접 부딪히며 해결해나간 코드들이라 많이 미숙합니다.

# http://3.38.119.177/

# 개인프로젝트

무중단 배포 상태로 개발은 따로 dev환경에서 개발됩니다.<br>
비밀번호는 암호화 후 db에 저장됩니다. <br>
형식에 맞춰서 회원가입 작성 해주시면 됩니다. <br>

마음에 안드시거나 피드백이 있으시다면 아래 메일로 연락주시면 감사하겠습니다.<br>
skskskoe@gmail.com<br>
skskoe@naver.com<br>

회원가입이 싫으시다면 아래 테스트계정으로 로그인 가능합니다. <br>
ID : testuser@test.com<br>PASSWORD : asdf1234!<br>

# 기술스택

언어 : JS <br>
프레임워크 : React Hook<br>
라이브러리 : JWT.io , Socket.io , Material UI<br>
서버 : node.js(express), NGINX<br>
데이터베이스 : mongoDB<br>
클라우드 서비스 : AWS S3, AWS EC2<br>
자원관리 : PM2<br>

# 미리보기

댓글<br><br><img src="https://user-images.githubusercontent.com/65318601/167687114-8fdc6b0b-aed4-4708-9958-a45178a74829.gif"/><br><br>
채팅<br><br><img src="https://user-images.githubusercontent.com/65318601/167687287-61a5f448-db8b-4850-87e9-b3eb4508859f.gif"/><br><br>
이미지업로드<br><br><img src="https://user-images.githubusercontent.com/65318601/167687298-e369ac70-cbcf-4be0-a194-fbf467b468f0.gif"/><br><br>
프로필<br><br><img src="https://user-images.githubusercontent.com/65318601/167687312-d1e1ff95-6ce4-419e-89a0-07faa9ce1c3c.gif"/><br><br>
팔로우<br><br><img src="https://user-images.githubusercontent.com/65318601/167690788-6aca9629-7944-42a0-9e5e-acb93e961ff7.gif"/><br><br>
모바일 요약 <br><br><img src="https://user-images.githubusercontent.com/65318601/167691373-6775adc5-c208-4edb-83ef-b2c8fd41954d.gif"/><br><br>

# 수정이 필요한 부분 메모

테스팅중입니다. QA로 이관

1. 전체적으로 소켓으로 묶을 예정 appbar 에서 소켓을 디스패치 한다면 ... appbar에서 소켓이 연결될때 디스패치를 통해 스토어에 담아뒀다. notice 컴포넌트만 제작하면 완성!
2. 글작성이 안됨 ㅡ 완
3. 댓글 스페이스바 안눌림 ㅡ 완
4. 댓글작성만 눌러도 댓글이 올라감 ㅡ 완
5. 댓글삭제기능이 없음 ㅡ 완
6. 팔로우/팔로워 내역 ㅡ 완
7. 글 내역이 없으면 '작성된 글이 없습니다' 라고 떴음 좋겟음 ㅡ 완
8. 댓글단 사람도 프로필 볼 수 있게 ㅡ 완
9. 프로필 보는 팝업 뜨는거 사라져요 궁씨 ㅡ 완
10. 댓글 작성시 엔터치면 작성과함께 새로고침됨 ㅡ 완
11. 댓글 작성하면 댓글이 밀림 ㅡ 완
12. 작성 시간이없음 ㅡ 계획 없음 
13. 채팅 유저추가를 할때 레이아웃 깨짐 현상 ㅡ 완
14. 회원가입 비밀번호가 잘못된 상태로 회원가입 진행 ㅡ 완 (정규식 추가)
15. s3 경로 수정 필요  ㅡ 완
16. 댓글과 좋아요 구조 변경 ㅡ 완
17. 프로필 변경 정규식 추가 필요 ㅡ 완
18. nginx 파일 크기 지정 해제 ㅡ 완
19. 댓글 구조 변경 필요 댓글에는 id값을 안넣어줬는데 delete시 어떤 댓글인지 식별불가 - 진행중
20. 마우스 호버시 호버프로필이 사라졌다 다시 뜨는 경우가 생김. (onFocus와 onBlur 처리 필요) - 진행중 (버블링과 캡처링 문제 나의 지식부족 공부가 필요) - 완
21. 좋아요 구조변경 필요. 현재 좋아요는 팔로우구조와 마찬가지로 첫렌더링시 좋아요 여부를 체크한 후 하트이미지와 좋아요 수 렌더링 그 후 클릭시 좋아요 수 컴포넌트 리렌더링 실행 으로 이어지는 구조인데 ... 살짝 로딩이있어서 좋아요 클릭 시 앞단에서만 좋아요 갯수만 하나 증가시키고 백단에서 데이터작업 후 페이지 리로드시 다시 보여줄지 고민이다. - 고민중
22. intersection observer - 지금 imageBoardList(Board) imageboardListCmp(Home) 두 컴포넌트는 인터섹션 옵저버로 무한 스크롤링을 구현중인데 .. 구조를 조금 바꿔야겠다. - DEV 적용 완
23. AppBar에서 searchInput 에서 Blur시 리스트가 그대로 남아있다 - DEV 적용 완
24. imageBoardList(Board) 에서 스크롤바가 생성된다.
25. 스토어에 저장된 소켓을 채팅방(dmList)에 접속했을때 useSelector로 가져오는데 첫렌더링시 소켓에 connected : false 로 연결이 되어있지 않다. 리로드를 해야 연결됨. 수정이 필요
26. 모바일에서 작성 버튼을 누르면 바로 submit이 되지않고 focus가 풀려서 두번 눌러줘야함 onclick처리가 되어있어서 mousedown으로 해결 - 완
 
# 진행중 아쉬운 점<br>

무계획으로 진행한 프로젝트다 보니 컴포넌트를 좀더 세분화 시킬수 있었는데<br>리액트의 강점을 못살린 느낌<br>
작은 컴포넌트로 쪼개서 기능과 css 추가해서 프롭스로 값만 넘겨주며 사용하니 너무 편하다<br>

오픈채팅을 dm으로 전환하고 푸쉬 알림기능 까지 마무리하면 리팩토링이 전체적으로 필요한 것 같다. <br>
첫 react 사용이었는데 배우면서 제작한다는 느낌이라 살을 붙이며 뼈대를 구성했지만 <br>
다음 프로젝트는 뼈대부터 잡고 살을 붙이며 진행할 수 있을 것 같다. 

컴포넌트 자체를 더 잘게 쪼개면 훨씬 더 간단하게 제작 할 수 있었는데 어느정도 진행 한 후에 느껴버렸다.<br>
대용량 트래픽이 발생시 어떻게 될지 궁금하기도 하다. <br>

mui, hook, socket 등등 모든 건 document안에 있었다.<br>
만약 내가 새프로젝트를 진행한다면 document를 한번 정독하고 진행하는것이 좋은 것 같다.

