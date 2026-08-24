# 익명 핵심행동 계측 v1 운영 안내

## 수집 범위

다음 네 이벤트의 날짜별 합계만 저장합니다.

- `game_start`
- `game_complete`
- `reroll`
- `exclude_reroll`

집계 차원은 `method`, `input_mode`, `participant_bucket`, `result_mode`입니다. 이름, 번호 목록, 직접 입력 결과, 당첨 내용, 사용자·세션 식별자, IP, User-Agent, 리퍼러는 애플리케이션 데이터로 저장하지 않습니다.

## Cloudflare 설정

1. Cloudflare 대시보드에서 D1 데이터베이스 `random-ppobgi-analytics`를 생성합니다.
2. D1 콘솔에서 `migrations/0001_event_counts.sql`을 실행합니다.
3. Workers & Pages → `random-ppobgi` → Settings → Bindings에서 D1 바인딩을 추가합니다.
4. 변수 이름은 반드시 `ANALYTICS_DB`로 지정하고 생성한 데이터베이스를 선택합니다.
5. Preview와 Production 환경 모두 별도로 연결합니다. QA에는 별도 Preview 데이터베이스 사용을 권장합니다.
6. 바인딩 적용 후 프로젝트를 다시 배포합니다.

바인딩이 없거나 D1 쓰기가 실패하면 `/api/events`는 `503`을 반환합니다. 브라우저의 계측 호출은 비차단 방식이며 이 오류가 게임 실행을 막지 않습니다.

## 운영 확인

최근 날짜별 이벤트 합계:

```sql
SELECT event_date, event_name, SUM(count) AS total
FROM event_counts
GROUP BY event_date, event_name
ORDER BY event_date DESC, event_name;
```

게임별 시작·완료:

```sql
SELECT method, event_name, SUM(count) AS total
FROM event_counts
WHERE event_name IN ('game_start', 'game_complete')
GROUP BY method, event_name
ORDER BY method, event_name;
```

재추첨 행동:

```sql
SELECT event_name, method, SUM(count) AS total
FROM event_counts
WHERE event_name IN ('reroll', 'exclude_reroll')
GROUP BY event_name, method
ORDER BY event_name, method;
```

`game_complete / game_start`는 사용자별 전환율이 아니라 전체 실행 흐름의 완료 비율입니다. 사용자·세션 식별자를 수집하지 않으므로 개인별 재방문율이나 고유 사용자 수는 계산하지 않습니다.
