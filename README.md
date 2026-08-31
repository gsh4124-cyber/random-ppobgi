# 랜덤뽑기

결과는 랜덤, 방식은 마음대로.

번호나 이름을 입력하고 상황에 맞는 게임 방식으로 무작위 선택을 진행하는 정적 웹 서비스입니다.

- 운영 주소: https://random-ppobgi.pages.dev/
- 현재 버전: v50

## 저장소 역할

이 `gsh4124-cyber/random-ppobgi` 저장소가 랜덤뽑기의 **실제 코드와 현재 운영상태 인계의 단일 원본**입니다.

- 상위 영역: 황제 Vault `자동 사업운영/바이브코딩/`
- ChatGPT 통합 관제: `자동 사업운영`
- 실제 실행창: `랜덤뽑기 Work`
- 현재 상태 인계: `PROJECT_STATUS.md`
- private 집계 데이터: 황제 Vault `자동 사업운영/바이브코딩/데이터/random-ppobgi/analytics_latest.json`

별도의 한글 `랜덤뽑기` 코드·운영 폴더를 만들지 않습니다.

## 표준 로컬 경로

`C:/Users/gsh41/Desktop/황제/자동 사업운영/바이브코딩/random-ppobgi`

부모 `hwangje-vault`는 이 로컬 폴더를 `.gitignore`로 제외하며, `random-ppobgi` 자체 Git 이력은 이 저장소에서 독립 관리합니다.

## 게임

사다리, 룰렛, 제비, 핀볼, 경주, 캡슐, 슬롯, 폭탄의 8가지 방식을 제공합니다.

## 개인정보 처리

입력한 이름, 번호, 직접 입력 결과와 당첨 내용은 사용자의 브라우저 안에서만 처리되며 서버로 전송하거나 저장하지 않습니다. 제품 개선을 위해 게임 종류·입력 방식·참가 인원 구간·결과 방식별 핵심 행동 횟수만 날짜별 합계로 집계합니다. 사용자 ID, 광고 ID, 쿠키 기반 식별자는 사용하지 않습니다. 자세한 내용은 서비스의 `/privacy/` 페이지에서 확인할 수 있습니다.

## 배포 구조

외부 프레임워크나 빌드 단계 없이 HTML, CSS, JavaScript 정적 파일을 GitHub 저장소에서 Cloudflare Pages로 배포합니다. 익명 핵심행동 집계 엔드포인트는 Pages Function과 D1을 사용합니다. 설정과 조회 방법은 `ANALYTICS.md`를 참고하세요.

## 로컬 실행

저장소 루트에서 정적 파일 서버를 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다.
