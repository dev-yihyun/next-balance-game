# 🆚Balance Game🎲

<img src="https://github.com/user-attachments/assets/8f3ca9dc-7e1f-4019-a03f-1865430d294a"/>

## [프로젝트 소개]
- 링크🔗 :  [Balance Game](https://next-balance-game.vercel.app/)
- 개인 프로젝트
- 사용자가 두 가지 선택지를 제시하고, 다른 사용자가 익명으로 투표할 수 있는 밸런스 게임 웹페이지 입니다.
- 실시간 반응성과 공유 기능을 통해 사용자 참여를 유도하는 것이 목표였습니다.

### [주요기능]

- **질문지 생성** : 두 개의 선택지를 입력해 밸런스 게임을 생성
- **익명 투표 및 중복 투표 방지 기능** : 로그인 없이 투표가 가능하지만 중복 투표는 방지
- **실시간 투표 반영** : Firebase를 활용해 투표 결과를 실시간으로 반영
- **링크 공유 기능** : Web Share API로 간편하게 질문 링크 공유 기능
- **CI/CD** : GitHub와 Vercel을 연동하여 커밋 및 PR 시 자동으로 빌드 및 배포가 이루어지는 환경을 구축

### [기술스택]

1. Next.js
2. TypeScript
3. Tailwind CSS
4. Firebase
5. React-Query
6. Web Share API

### [구현]

- **Next.js**
    - SSR과 CSR 흐름을 적절히 활용하여 초기 렌더링 속도 및 SEO 고려
    - 라우팅, 페이지 기반 구조를 통해 깔끔한 설계 유지
- **TypeScript**
    - 컴파일 타임 타입 체크로 안정적인 코드 작성
    - 컴포넌트 재사용성과 가독성 향상
- **Tailwind CSS**
    - 빠른 UI 작업 및 반응형 디자인 구현
- **Firebase**
    - 실시간 데이터베이스로 투표 결과 반영 및 중복 방지 로직 구현
- **React-Query**
    - 데이터 요청, 캐싱 및 상태 관리를 효율적으로 처리
    - UX 향상을 위한 빠른 데이터 업데이트 제공
- Web Share API
    - 공유 UX 개선 및 공유 기능을 통해 링크 전달 간편화

### [후기]

- Firebase와 연동하여 실시간 데이터 처리 및 구조 설계를 직접 경험하며 백엔드와의 데이터 흐름을 이해할 수 있었습니다.
- SSR, CSR, 상태관리, UI 구성, 데이터 처리 등 다양한 기술을 유기적으로 사용해보았습니다.
- GitHub와 Vercel 연동을 통한 자동 배포 (CI/CD) 설정으로, 반복적인 배포 작업을 자동화하면서 효율적인 개발 환경의 중요성을 체감했습니다.


### [시연영상]

<table>
    
<tr>
<td> <p align="center">메인페이지</p></td>
</tr>
<tr>
<td>
<p align="center">
<img src="https://github.com/user-attachments/assets/0d331ff3-9bb5-4672-af76-771ef5073b8e">
</p>
</td>
</tr>

<tr>
<td> <p align="center">밸런스 생성</p></td>
</tr>
<tr>
<td>
<p align="center">
<img src="https://github.com/user-attachments/assets/3447bc03-44b3-4e73-ba5b-588cf8a6e6b6">
</p>
</td>
</tr>

<tr>
<td> <p align="center">익명 투표</p></td>
</tr>
<tr>
<td>
<p align="center">
<img src="https://github.com/user-attachments/assets/2c25562c-6e3d-4e3d-b32a-b08bc931859c">
</p>
</td>
</tr>

</table>
