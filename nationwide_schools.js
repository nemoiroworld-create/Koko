/**
 * 全国47都道府県 中学校データベース ＆ 詳細通学ルート計算エンジン
 * (nationwide_schools.js)
 */

// 都道府県の通学圏グループ定義（日常通学可能な地理的クラスター）
const COMMUTE_REGIONS = {
  kanto: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"],
  kansai: ["大阪府", "兵庫県", "京都府", "奈良県", "滋賀県", "和歌山県"],
  tokai: ["愛知県", "岐阜県", "三重県", "静岡県"],
  kyushu: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県"],
  okinawa: ["沖縄県"],
  hokkaido: ["北海道"],
  tohoku: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  chugoku: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  shikoku: ["徳島県", "香川県", "愛媛県", "高知県"],
  hokuriku: ["富山県", "石川県", "福井県"],
  koushinetsu: ["新潟県", "山梨県", "長野県"]
};

// 47都道府県 全国代表校データベース
const NATIONWIDE_SCHOOL_LIST = [
  // ==================== 北海道・東北 ====================
  {
    school_id: "sch_hokurei",
    name: "北嶺中学校",
    name_ruby: "ほくれいちゅうがっこう",
    official_url: "https://www.kibou.ac.jp/hokurei/",
    catchphrase: "めざすなら高い嶺。大自然のなかで高い知性とたくましい心を育む名門男子校",
    recommend_phrase: "★ 北の大地で医学部・最難関大を目指し、勉強も自然体験も思いきり打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "北海道",
    district: "札幌市清田区",
    station_name: "福住駅",
    access_info: {
      primary_line: "地下鉄東豊線",
      hub_station: "さっぽろ駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "地下鉄福住駅・南郷18丁目駅・JR新札幌駅より学校専用直通スクールバス運行（約15分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科（全寮制・通学制併設）",
    commute_time: 35,
    tuition: 890000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "stem"],
    vibe_label: "文武両道・理数探究",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・国公立大医学部現役合格率全国トップクラス",
    events: [
      { id: "ev_hoku_open", title: "オープンキャンパス＆青雲寮見学", date: "9月20日(土)", type: "学校説明会", desc: "広大な清田キャンパスと全国から集まる仲間が暮らす青雲寮を見学できます。" }
    ],
    special_classes: [
      { title: "北嶺G（グローバル）プロジェクト", desc: "大自然の中でのフィールドワークや先端医療機関との連携ゼミ！" }
    ],
    school_strengths: [
      "東大・国公立医学部への抜群の合格実績と徹底した個別学習フォロー！",
      "札幌市内各ターミナル駅から直通スクールバスで快適通学！",
      "全天候型屋内グラウンドや温水プールなど国内屈指のスポーツ・教育設備！"
    ],
    life_simulation: "福住駅からの専用スクールバスで爽やかな緑の丘へ登校。午後は高度な理数・英語の授業に取り組み、放課後は部活や自習室で仲間と高め合います。",
    parent_summary: "【進学・教育】全国屈指の国公立医学部・東大合格率を誇る中高一貫男子校。少人数によるきめ細かな習熟度別指導と自学自習習慣の確立が強みです。【環境・費用】札幌市清田区。各線主要駅から専用直通スクールバスを運行し、安全で快適な通学環境が整っています。",
    child_summary: "広いグラウンドと大きな自然に囲まれたかっこいい学校！スキーやキャンプなどの大自然体験と、理科の本格的な実験が毎日楽しめるよ！",
    tags: ["interest_science_space", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "自然・科学・医学探究",
    is_favorite: false
  },
  {
    school_id: "sch_aomori_yamada",
    name: "青森山田中学校",
    name_ruby: "あおもりやまだちゅうがっこう",
    official_url: "https://www.aomoriyamada-jhs.jp/",
    catchphrase: "スポーツと学業の融合。確かな基礎学力と強い精神力を育む共学校",
    recommend_phrase: "★ 全国レベルのスポーツや活動に励みながら、大学進学もしっかり目指したい人におすすめ！",
    photo_url: "assets/images/real_shibaura.jpg",
    prefecture: "青森県",
    district: "青森市",
    station_name: "青森駅",
    access_info: {
      primary_line: "青い森鉄道・JR奥羽本線",
      hub_station: "新青森駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "青森駅・新青森駅・市内各エリアより無料スクールバス直通運行（約15分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "特進コース / スポーツコース",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "文武両道・手厚い",
    club_label: "全国レベル",
    record_label: "◎",
    deviation_score: 52,
    match_rate_child: 90,
    recent_passed_records: "国公立大学・難関私立大・プロスポーツ界へ多数輩出",
    events: [
      { id: "ev_aomori_open", title: "学校見学会＆部活動体験", date: "10月11日(土)", type: "学校説明会", desc: "最新の学習施設と全国屈指のスポーツ練習設備を体験できます。" }
    ],
    special_classes: [
      { title: "放課後個別ステップアップ講座", desc: "習熟度に合わせて弱点を完全克服する少人数指導！" }
    ],
    school_strengths: [
      "スクールバス完備で青森市内全域から安全・快適に通学可能！",
      "勉強と部活動を両立できるタイムスケジュールと手厚い補習体制！",
      "充実したICT環境で一人ひとりの理解度に合わせた個別最適学習！"
    ],
    life_simulation: "専用バスで元気いっぱいに登校。朝の集中学習からスタートし、放課後は大好きな部活や補習に全力投球。仲間と励まし合いながら成長できる毎日です。",
    parent_summary: "【進学・教育】文武両道を掲げ、特進コースでは手厚い補習と個別指導で国公立大・私立大進学を強力にサポート。【環境・費用】青森市内各駅から充実のスクールバス網を運行。面倒見の良さと明るい校風が魅力です。",
    child_summary: "スポーツも勉強も思いきり頑張れる元気な学校！スクールバスで通えて、仲間と一緒にいろんなことに挑戦できるよ！",
    tags: ["interest_sports_athletics", "interest_social_events"],
    interest_category_label: "スポーツ・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_sendai_nika",
    name: "宮城県仙台二華中学校",
    name_ruby: "みやぎけんせんだいにかちゅうがっこう",
    official_url: "https://nika.myswan.ed.jp/",
    catchphrase: "高い志と知性を育み、未来のグローバルリーダーを育成する公立中高一貫校",
    recommend_phrase: "★ 仙台駅からアクセス抜群！抑えられた学費でハイレベルな探究学習をしたい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "宮城県",
    district: "仙台市若林区",
    station_name: "仙台駅",
    access_info: {
      primary_line: "JR東北本線・仙台市地下鉄東西線",
      hub_station: "仙台駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR仙台駅東口より徒歩10分、地下鉄連坊駅より徒歩7分の抜群の立地"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 20,
    tuition: 220000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["global", "stem"],
    vibe_label: "公立一貫・先進探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 96,
    recent_passed_records: "東大・東北大をはじめとする難関国公立大学へ多数合格",
    events: [
      { id: "ev_nika_setsu", title: "二華中 学校説明会", date: "9月13日(土)", type: "学校説明会", desc: "公立中高一貫教育の魅力や探究型カリキュラムを詳しく解説します。" }
    ],
    special_classes: [
      { title: "グローバル・アカデミック探究", desc: "地域の課題や国際問題をテーマに、自ら仮説を立て英語でプレゼンテーション！" }
    ],
    school_strengths: [
      "仙台駅東口から徒歩10分の好アクセスで県内各地から無理なく通学！",
      "公立中高一貫校ならではの充実した教育と抑えられた学費負担！",
      "東北大学との高大連携による高度なサイエンス・リサーチプログラム！"
    ],
    life_simulation: "仙台駅から友人と歩いて校舎へ。午前は思考力を鍛える探究的な授業、放課後は図書室での調べ学習やクラブ活動に励みます。",
    parent_summary: "【進学・教育】県内屈指の公立中高一貫共学校。東北大・東大をはじめとする難関国公立大へ抜群の合格実績。公立のため授業料が抑えられ経済的負担が少ない点も魅力。【環境・費用】仙台駅徒歩10分。6年間を見通した体系的なカリキュラムで高い論理的思考力を育てます。",
    child_summary: "仙台駅から歩いてすぐのピカピカな学校！みんなで調べたり発表したりする授業がたくさんあって、面白いアイデアをどんどん形にできるよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "公立一貫・探究・国際",
    is_favorite: false
  },

  // ==================== 関東（東京・神奈川・埼玉・千葉・北関東） ====================
  {
    school_id: "sch_shibushibu",
    name: "渋谷教育学園渋谷中学校",
    name_ruby: "しぶやきょういくがくえんしぶやちゅうがっこう",
    official_url: "https://www.shibushibu.jp/",
    catchphrase: "自調自考の精神で、世界に羽ばたく個性を育てる共学校",
    recommend_phrase: "★ 自分で調べ・自分で考える「自調自考」で自由に探究したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "渋谷区",
    station_name: "渋谷駅",
    access_info: {
      primary_line: "JR山手線・東急東横線・東京メトロ半蔵門線",
      hub_station: "渋谷駅",
      walk_minutes: 7,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "各線渋谷駅より徒歩7分、原宿駅・明治神宮前駅より徒歩8分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 980000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "global"],
    vibe_label: "自由・国際的",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 67,
    match_rate_child: 98,
    recent_passed_records: "東大・京大・ハーバード・スタンフォード等国内外難関大多数",
    events: [
      { id: "ev_shibushibu_bunkasai", title: "飛翔祭（文化祭）", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "生徒が企画運営する自由でエネルギッシュな展示・英語劇・模擬店が満載！" }
    ],
    special_classes: [
      { title: "自調自考論文・探究活動", desc: "自ら問いを立て、1万字以上の本格論文を書き上げる深い思考の授業！" }
    ],
    school_strengths: [
      "渋谷駅から徒歩7分！アクセス抜群で先進的な都市型キャンパス！",
      "帰国生も多く、日常的に多様な文化や価値観と触れ合える！",
      "「シラバス（年間の学習設計図）」で目標を見通しながら主体的に学べる！"
    ],
    life_simulation: "朝は渋谷駅から賑やかな街並みを歩いて登校。午前中はディベートや探究型の授業で意見を交わし、放課後は部活動や自習室での論文執筆に仲間と熱中します。",
    parent_summary: "【進学・教育】国内外のトップ大学へ高い進学実績を誇る完全中高一貫共学校。シラバス教育と『自調自考論文』により、自ら課題を発見し解決する高い問題解決力を育成します。【環境・費用】渋谷駅徒歩7分。少人数英語指導や海外研修などグローバル教育が充実しています。",
    child_summary: "「自分で調べ、自分で考える」がモットーのワクワクする学校！英語を楽しく話せる授業や、好きなテーマをとことん研究できる自由な時間がいっぱいあるよ！",
    tags: ["interest_digital_tech", "interest_reading_history", "interest_social_events"],
    interest_category_label: "国際・社会・探究",
    is_favorite: false
  },
  {
    school_id: "sch_kaisei",
    name: "開成中学校",
    name_ruby: "かいせいちゅうがっこう",
    official_url: "https://kaiseigakuen.jp/",
    catchphrase: "質実剛健と自由の気風。仲間とともに高みを目指す伝統男子校",
    recommend_phrase: "★ 最高の仲間と熱い行事に燃え、勉強も部活動もトコトン極めたい人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "東京都",
    district: "荒川区",
    station_name: "西日暮里駅",
    access_info: {
      primary_line: "JR山手線・京浜東北線・東京メトロ千代田線",
      hub_station: "西日暮里駅",
      walk_minutes: 2,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR・千代田線西日暮里駅より徒歩2分の直結好立地"
    },
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科",
    commute_time: 25,
    tuition: 820000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "free"],
    vibe_label: "質実剛健・自主自律",
    club_label: "非常に盛ん",
    record_label: "◎",
    deviation_score: 71,
    match_rate_child: 96,
    recent_passed_records: "東大合格者数40年以上連続全国第1位・国公立医学部多数",
    events: [
      { id: "ev_kaisei_undokai", title: "開成大運動会", date: "5月10日(日)", type: "見学イベント", desc: "伝統の棒倒し！全校生徒の熱気がスタジアムを包む名物行事！" }
    ],
    special_classes: [
      { title: "本格的な理科実験・観察ゼミ", desc: "中1から毎週本格的な実験レポートを書き上げ、科学的思考の基礎を徹底鍛錬！" }
    ],
    school_strengths: [
      "西日暮里駅徒歩2分の好立地！新校舎には広大な理科実験棟や温水プールも完備！",
      "先輩が後輩を全力で育てる「縦の絆」が非常に強く、一生の仲間ができる！",
      "運動部・文化部ともに全国トップレベルの活発な部活動環境！"
    ],
    life_simulation: "西日暮里駅からすぐの校舎へ。放課後は部活動で思いきり汗を流し、行事前には夜遅くまで仲間と作戦会議。高い学力とたくましいリーダーシップを同時に磨きます。",
    parent_summary: "【進学・教育】国内最高峰の東大合格実績を誇る完全中高一貫男子校。生徒主体の行事運営を通じた高い自治力とリーダーシップの育成、実技・体験を重んじる多面的な教育カリキュラムが魅力です。【環境・費用】西日暮里駅徒歩2分。質実剛健で互いを高め合う濃密な男子校文化が息づいています。",
    child_summary: "全校生徒が本気で熱中する伝統の大運動会が最高にかっこいい！お互いを認め合える最高の仲間と一緒に、勉強も部活動も思いきり全力で打ち込めるよ！",
    tags: ["interest_sports_athletics", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "伝統・文武両道・仲間",
    is_favorite: false
  },
  {
    school_id: "sch_oin",
    name: "桜蔭中学校",
    name_ruby: "おういんちゅうがっこう",
    official_url: "https://www.oin.ed.jp/",
    catchphrase: "礼と学びの心。自立した女性の知性と品性を育む最高峰女子校",
    recommend_phrase: "★ 確かな学力と礼儀作法を身につけ、理数や知的好奇心を深めたい人におすすめ！",
    photo_url: "assets/images/real_oin.jpg",
    prefecture: "東京都",
    district: "文京区",
    station_name: "水道橋駅",
    access_info: {
      primary_line: "JR中央・総武線・都営三田線",
      hub_station: "水道橋駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR水道橋駅東口より徒歩5分、春日駅・後楽園駅より徒歩10分"
    },
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科",
    commute_time: 30,
    tuition: 850000,
    gender_type: "girls",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "both"],
    vibe_label: "知性・気品・理系",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 97,
    recent_passed_records: "東大理科三類をはじめ東大・難関国公立大医学部合格者数日本一",
    events: [
      { id: "ev_oin_bunkasai", title: "桜蔭祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "学術的でハイレベルなクラブ研究発表、美しい合唱、温かいおもてなしを体験！" }
    ],
    special_classes: [
      { title: "中1必修の礼法特別授業", desc: "美しい立ち居振る舞いや心遣い、礼儀作法を身につける一生モノの授業！" }
    ],
    school_strengths: [
      "水道橋駅から徒歩5分！都心にありながら落ち着いた文教地区の学習環境！",
      "東大・医学部進学実績で全国屈指！高い志を持つ仲間と切磋琢磨できる！",
      "数学部や天文部、茶道・華道など知性と情操を育む部活動が充実！"
    ],
    life_simulation: "水道橋駅から坂を上がり落ち着いた校舎へ登校。朝の読書で心を整え、高度な授業に集中。放課後は大好きな部活や仲間との勉強会で充実した時間を過ごします。",
    parent_summary: "【進学・教育】東大・国公立医学部合格実績で日本トップを誇り、理数教育と高い論理的思考力を養成。【環境・費用】文京区の落ち着いた文教地区。中学1年次の礼法授業に象徴される、高い知性と品性を兼ね備えた自立した女性を育みます。",
    child_summary: "女子最難関校！算数や理科の実験がすごく面白くて、勉強が大好きな仲間が集まるよ。優しくて頼りになるかっこいい先輩たちがいっぱいいる憧れの学校！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_reading_history"],
    interest_category_label: "知性・理数・礼儀作法",
    is_favorite: false
  },
  {
    school_id: "sch_seiko",
    name: "聖光学院中学校",
    name_ruby: "せいこうがくいんちゅうがっこう",
    official_url: "https://www.seiko.ac.jp/",
    catchphrase: "紳士たれ。手厚い面倒見と最難関大進学実績を誇るカトリック男子校",
    recommend_phrase: "★ 充実したICT設備と手厚い先生方のサポートで、安心して力を伸ばしたい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "神奈川県",
    district: "横浜市中区",
    station_name: "山手駅",
    access_info: {
      primary_line: "JR根岸線（京浜東北線直通）",
      hub_station: "横浜駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR根岸線山手駅より徒歩8分（横浜駅より電車10分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 30,
    tuition: 890000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い・進学校・紳士",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 96,
    recent_passed_records: "東大現役合格率全国第1位レベル・国公立医学部多数合格",
    events: [
      { id: "ev_seiko_fes", title: "聖光祭（文化祭）", date: "4月26日(土)・27日(日)", type: "文化祭", desc: "生徒主体の洗練された展示、食品企画、バンド演奏で熱気あふれる2日間！" }
    ],
    special_classes: [
      { title: "聖光塾（教養探究プログラム）", desc: "学問・芸術・ボランティアなど、教科の枠を超えて知的好奇心を刺激する放課後講座！" }
    ],
    school_strengths: [
      "東大現役合格率で日本トップクラス！塾いらずと言われる極めて手厚い校内指導！",
      "全館Wi-Fi完備、最新カフェテリアや広大な人工芝グラウンドを備えた美しい校舎！",
      "カトリックの愛の精神に基づき、他者への思いやりを持った豊かな人間性を育成！"
    ],
    life_simulation: "山手駅から緑豊かな住宅街を歩いて登校。朝の祈りで心を静め、ICTを駆使した密度の濃い授業を受講。放課後は放課後講座や部活動で仲間と充実の時間を過ごします。",
    parent_summary: "【進学・教育】東大現役合格実績で全国トップを争うカトリック系男子校。学校完結型の手厚い進学指導体制が確立されており、塾に通わずとも高い学力を養成します。【環境・費用】横浜市中区の閑静な丘の上。山手駅徒歩8分。生徒に寄り添う面倒見の良さと温かい校風が保護者から絶大な信頼を集めています。",
    child_summary: "校舎がホテルみたいにピカピカで、カフェテリアのご飯もすごく美味しい！勉強のサポートがしっかりしていて、部活も行事もみんなで本気で楽しめる大人気校！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_sports_athletics"],
    interest_category_label: "手厚い・進学・カトリック",
    is_favorite: false
  },
  {
    school_id: "sch_shibumaku",
    name: "渋谷教育学園幕張中学校",
    name_ruby: "しぶやきょういくがくえんまくはりちゅうがっこう",
    official_url: "https://www.shibumaku.jp/",
    catchphrase: "自調自考の精神。千葉から世界へ羽ばたく名門共学校",
    recommend_phrase: "★ 広いキャンパスで、ハイレベルな英語・探究学習と自由な校風を満喫したい人におすすめ！",
    photo_url: "assets/images/real_mita.jpg",
    prefecture: "千葉県",
    district: "千葉市美浜区",
    station_name: "海浜幕張駅",
    access_info: {
      primary_line: "JR京葉線・総武線",
      hub_station: "海浜幕張駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR京葉線海浜幕張駅より徒歩10分、JR総武線幕張駅より徒歩16分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 35,
    tuition: 950000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "global"],
    vibe_label: "自由・国際的・探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 69,
    match_rate_child: 97,
    recent_passed_records: "東大合格者数千葉県第1位・海外名門大・国公立医学部多数",
    events: [
      { id: "ev_shibumaku_bunkasai", title: "槐祭（文化祭）", date: "9月13日(土)・14日(日)", type: "文化祭", desc: "自由な発想で創り上げる圧巻の研究発表や英語劇、模擬店が目白押し！" }
    ],
    special_classes: [
      { title: "自調自考の倫理ゼミ", desc: "正解のない現代の問いに対し、仲間と徹底的に議論して自分の意見を確立する授業！" }
    ],
    school_strengths: [
      "海浜幕張の広大で開放的なキャンパス！温水プールや広大な人工芝グラウンド完備！",
      "帰国生が全校生徒の約1割を占め、日常会話でも自然に英語が飛び交う環境！",
      "海外トップ大学への直接進学サポートも極めて充実！"
    ],
    life_simulation: "海浜幕張駅から爽やかな海風を感じて登校。広々とした教室でディスカッションを重ね、放課後は部活やネイティブ教員とのディベートに熱中します。",
    parent_summary: "【進学・教育】千葉県トップの東大・難関大合格実績を誇る完全中高一貫共学校。自ら調べ自ら考える『自調自考』を理念とし、国内外の大学へ進学する高い知性を育成します。【環境・費用】JR海浜幕張駅徒歩10分。都内・千葉・埼玉・神奈川からの広域通学者が多数在籍しています。",
    child_summary: "海が近くて広くてかっこいいキャンパス！英語が上手な友達も多くて、自由な雰囲気の中で自分の大好きな研究にどこまでも没頭できるよ！",
    tags: ["interest_reading_history", "interest_digital_tech", "interest_social_events"],
    interest_category_label: "自調自考・国際・自由",
    is_favorite: false
  },
  {
    school_id: "sch_sakaehigashi",
    name: "栄東中学校",
    name_ruby: "さかえひがしちゅうがっこう",
    official_url: "https://www.sakaehigashi.ed.jp/",
    catchphrase: "今日学べ。アクティブラーニングと手厚い進学指導で夢を叶える共学校",
    recommend_phrase: "★ 駅から徒歩8分！活気ある授業と放課後の手厚い学習サポートで学力を伸ばしたい人におすすめ！",
    photo_url: "assets/images/real_shibaura.jpg",
    prefecture: "埼玉県",
    district: "さいたま市見沼区",
    station_name: "東大宮駅",
    access_info: {
      primary_line: "JR宇都宮線（上野東京ライン・湘南新宿ライン直通）",
      hub_station: "大宮駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR東大宮駅西口より徒歩8分（大宮駅から電車6分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "東大クラス / 難関大クラス",
    commute_time: 30,
    tuition: 860000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い補習・共学校",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 94,
    recent_passed_records: "東大・難関国公立大・医学部・早慶上理へ多数合格",
    events: [
      { id: "ev_sakae_fes", title: "栄東祭（文化祭）", date: "6月7日(土)・8日(日)", type: "文化祭", desc: "科学部やクイズ研究会の体験コーナー、中学生による研究発表が盛りだくさん！" }
    ],
    special_classes: [
      { title: "AL（アクティブ・ラーニング）課題研究", desc: "4人1組で問いを追求し、プレゼンテーション能力を飛躍的に高める授業！" }
    ],
    school_strengths: [
      "東大宮駅徒歩8分の好アクセス！上野東京ライン・湘南新宿ラインで東京・神奈川からも直通！",
      "「東大クラス」を設置し、生徒一人ひとりの学力を限界まで引き上げるきめ細かなフォロー！",
      "理科実験室が多数整備され、実体験を重視したサイエンス教育が充実！"
    ],
    life_simulation: "東大宮駅から平坦な通学路を歩いて登校。放課後は充実した自習室や教員への質問ブースで疑問をその日のうちに解消し、着実に実力を蓄えます。",
    parent_summary: "【進学・教育】高い大学合格実績と丁寧な進路指導で急成長を遂げた埼玉の名門共学校。アクティブラーニングの手法を取り入れ、自発的な学習意欲を引き出します。【環境・費用】東大宮駅徒歩8分。夜遅くまで利用できる自習館など、手厚い教育環境が整っています。",
    child_summary: "駅からも近くて通いやすい！クイズ研究会や理科の実験がすごく盛んで、先生たちも優しく教えてくれるから毎日楽しく学べるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_social_events"],
    interest_category_label: "手厚い・探究・共学",
    is_favorite: false
  },

  // ==================== 東海・北陸 ====================
  {
    school_id: "sch_tokai",
    name: "東海中学校",
    name_ruby: "とうかいちゅうがっこう",
    official_url: "https://www.tokai-jh.ed.jp/",
    catchphrase: "勤倹誠実の精神。圧倒的な自由と医学部合格日本一を誇る伝統男子校",
    recommend_phrase: "★ 名古屋の中心部で、圧倒的な自由と個性あふれる最高の仲間に出会いたい人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "愛知県",
    district: "名古屋市東区",
    station_name: "車道駅",
    access_info: {
      primary_line: "地下鉄桜通線・JR中央本線",
      hub_station: "名古屋駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄桜通線車道駅徒歩10分、JR・地下鉄千種駅徒歩15分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 760000,
    gender_type: "boys",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "自由・医学部実績・男子校",
    club_label: "極めて盛ん",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 96,
    recent_passed_records: "国公立大学医学部医学科合格者数17年連続日本第1位",
    events: [
      { id: "ev_tokai_kinen", title: "東海記念祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "自由な男子校の活気が大爆発！クラス演劇や本格的な学術研究展示が名物！" }
    ],
    special_classes: [
      { title: "サタデープログラム（市民公開講座）", desc: "各界の著名人や研究者を招き、生徒が企画・運営する年間最大の知の祭典！" }
    ],
    school_strengths: [
      "医学部医学科合格者数で全国ダントツの日本一！医師を目指す仲間が集結！",
      "細かい校則がなく、生徒の自主性と個性を最大限に尊重する大らかな校風！",
      "名古屋駅から地下鉄で直通アクセス抜群の文教エリア！"
    ],
    life_simulation: "車道駅から落ち着いた街並みを通って登校。放課後は自由な部活やサークル、自習室での学びに仲間と没頭。互いの個性を認め合う最高の青春を過ごします。",
    parent_summary: "【進学・教育】創立130年を超える浄土宗系の伝統男子校。国公立医学部合格実績で17年連続日本一を誇り、高い知性と自主自律の精神を養います。【環境・費用】名古屋市東区。仏教情操教育に基づく生命尊重の倫理観と、校則に縛られない自由闊達な教育方針が最大の特色です。",
    child_summary: "自由で面白い友達がたくさん集まる学校！お医者さんや科学者になりたい夢を持った仲間と一緒に、部活も文化祭も勉強も全力で楽しめるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "医学部実績・自由・伝統",
    is_favorite: false
  },
  {
    school_id: "sch_nanzan_girls",
    name: "南山中学校女子部",
    name_ruby: "なんざんちゅうがっこうじょしぶ",
    official_url: "https://www.nanzan-girls.ed.jp/",
    catchphrase: "高い知性と愛の心。自立した女性の未来を拓く東海地区最高峰女子校",
    recommend_phrase: "★ 駅から徒歩3分！カトリックの温かい精神の中で、高い学力と自立心を育みたい人におすすめ！",
    photo_url: "assets/images/real_oin.jpg",
    prefecture: "愛知県",
    district: "名古屋市昭和区",
    station_name: "いりなか駅",
    access_info: {
      primary_line: "地下鉄鶴舞線",
      hub_station: "伏見駅",
      walk_minutes: 3,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄鶴舞線いりなか駅2番出口より徒歩3分の抜群の立地"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 790000,
    gender_type: "girls",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["manners", "global"],
    vibe_label: "気品・知性・カトリック",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 95,
    recent_passed_records: "東大・名大・国公立医学部・早慶上智・南山大推薦枠など多数",
    events: [
      { id: "ev_nanzan_fes", title: "南山女子部 文化祭", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "学術研究、英語劇、器楽演奏など品格と知性が溢れる発表の数々！" }
    ],
    special_classes: [
      { title: "キリスト教倫理と人間論", desc: "他者のために生きる真のリーダーシップと思いやりの心を育てる授業！" }
    ],
    school_strengths: [
      "いりなか駅徒歩3分！雨の日も安心で安全な閑静な文教エリア！",
      "東海地区の女子校でトップの難関大学・医学部進学実績！",
      "英語教育に強く、多国籍なシスターや教員との交流が日常的！"
    ],
    life_simulation: "いりなか駅から木漏れ日の並木を通ってすぐ校舎へ。朝は祈りで静かに心を整え、密度の高い授業に集中。放課後はクラブや勉強会で仲間と励まし合います。",
    parent_summary: "【進学・教育】カトリック神言会を設立母体とする東海屈指の名門完全中高一貫女子校。名大・東大・国公立大医学部へ多数の進学者を輩出。【環境・費用】いりなか駅徒歩3分。高い品性と自立心を育む落ち着いた教育環境が保護者から絶大な信頼を得ています。",
    child_summary: "駅から近くてとってもきれいな学校！英語が楽しく学べて、優しくてかっこいい先輩たちがたくさんいる憧れの女子校だよ！",
    tags: ["interest_reading_history", "interest_arts_music", "interest_social_events"],
    interest_category_label: "気品・カトリック・知性",
    is_favorite: false
  },

  // ==================== 近畿（大阪・兵庫・京都・奈良） ====================
  {
    school_id: "sch_nada",
    name: "灘中学校",
    name_ruby: "なだちゅうがっこう",
    official_url: "http://www.nada.ac.jp/",
    catchphrase: "精力善用・自他共栄。日本屈指の知性と自由を誇る最高峰男子校",
    recommend_phrase: "★ 枠にとらわれず、好きな学問や探究をとことん極めたい知的好奇心旺盛な人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "兵庫県",
    district: "神戸市東灘区",
    station_name: "住吉駅",
    access_info: {
      primary_line: "JR神戸線・阪神本線",
      hub_station: "三ノ宮駅 / 大阪駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR住吉駅より徒歩10分、阪神魚崎駅より徒歩10分（大阪・三ノ宮から直通快速利用可）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 780000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "最高峰・自由・理数",
    club_label: "自由",
    record_label: "◎",
    deviation_score: 72,
    match_rate_child: 99,
    recent_passed_records: "東大理三・京大医・東大京大合格率全国ダントツ日本一",
    events: [
      { id: "ev_nada_bunkasai", title: "灘校文化祭", date: "5月2日(土)・3日(日)", type: "文化祭", desc: "数学研究部や物理研究部、パソコン研究会の驚異的なレベルの研究発表が圧巻！" }
    ],
    special_classes: [
      { title: "担任団による6年間完全一貫カリキュラム", desc: "教科書を飛び越え、教員の専門知識を注ぎ込む本質的な思考の授業！" }
    ],
    school_strengths: [
      "日本最高峰の進学実績！全国から集まる卓越した才能と切磋琢磨できる！",
      "校則で生徒を縛らない、完全な自由と自律の精神！",
      "JR・阪神の2路線が使え、神戸・大阪・西宮・京都からもアクセス良好！"
    ],
    life_simulation: "住吉駅から閑静な住宅街を歩いて登校。授業ではハイレベルな疑問が飛び交い、放課後はクラブ活動や数学オリンピックの難問に仲間と熱中します。",
    parent_summary: "【進学・教育】日本屈指の東大・京大・国公立医学部合格実績を誇る完全中高一貫男子校。嘉納治五郎の教え『精力善用・自他共栄』を是とし、担任団持ち上がり制による自由で深遠な学びを展開。【環境・費用】神戸市東灘区。JR・阪神両駅から徒歩10分。生徒の自律的な探究心を重んじます。",
    child_summary: "日本一の知性が集まるワクワクする学校！数学や科学、ロボットなど、好きなことをどこまでもトコトン極められる自由な空気があるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_digital_tech"],
    interest_category_label: "最高峰・理数・自由",
    is_favorite: false
  },
  {
    school_id: "sch_osaka_seiko",
    name: "大阪星光学院中学校",
    name_ruby: "おおさかせいこうがくいんちゅうがっこう",
    official_url: "https://www.osakaseiko.ac.jp/",
    catchphrase: "愛と規律の教育。夕陽丘の丘で高い知性と人間性を磨くカトリック男子校",
    recommend_phrase: "★ 駅から徒歩2分！天王寺・難波からのアクセス抜群で、手厚く難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "大阪府",
    district: "大阪市天王寺区",
    station_name: "四天王寺前夕陽ヶ丘駅",
    access_info: {
      primary_line: "Osaka Metro谷町線・JR環状線",
      hub_station: "天王寺駅 / 梅田駅",
      walk_minutes: 2,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄谷町線四天王寺前夕陽ヶ丘駅より徒歩2分、天王寺駅・難波駅からも至近"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 20,
    tuition: 840000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い・カトリック・駅近",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・阪大・国公立大医学部へ抜群の合格実績",
    events: [
      { id: "ev_seiko_bunkasai", title: "星光祭（文化祭）", date: "11月3日(祝)", type: "文化祭", desc: "学術展示やステージ発表、カトリックの温かなバザーなど活気ある催しが満載！" }
    ],
    special_classes: [
      { title: "黒姫合宿・野尻湖合宿（校外特別学習）", desc: "大自然の中で教員と寝食を共にし、自立心と生涯の友情を育む伝統行事！" }
    ],
    school_strengths: [
      "四天王寺前夕陽ヶ丘駅徒歩2分！大阪・天王寺・梅田・難波から抜群のアクセス！",
      "手厚い学習指導体制で京大・阪大・国公立医学部への現役合格率が極めて高い！",
      "長野県の合宿施設を活用した体験学習でたくましい精神力を鍛錬！"
    ],
    life_simulation: "夕陽ヶ丘駅からすぐ校舎へ。静かな環境で集中して授業を受け、放課後はグラウンドでのクラブ活動や補習に参加。規律正しく充実した男子校ライフを送ります。",
    parent_summary: "【進学・教育】サレジオ修道会を設立母体とする大阪男子最難関の一角。京大・東大・国公立医学部への高い進学実績を維持。【環境・費用】天王寺区夕陽丘の歴史ある文教地区。駅徒歩2分。合宿教育に代表される面倒見の良さと徳育が保護者から高く評価されています。",
    child_summary: "駅から歩いてたったの2分！黒姫の山や湖でのサマーキャンプがすごく楽しくて、勉強もしっかり教えてくれる頼もしい学校だよ！",
    tags: ["interest_nature_biology", "interest_puzzle_math", "interest_sports_athletics"],
    interest_category_label: "駅近・手厚い・自然合宿",
    is_favorite: false
  },
  {
    school_id: "sch_raku_nan",
    name: "洛南高等学校附属中学校",
    name_ruby: "らくなんこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.rakunan-h.ed.jp/",
    catchphrase: "自ら学び自ら律する。東寺の境内に息づく関西屈指の共学進学校",
    recommend_phrase: "★ 京都駅から徒歩圏！規律ある環境で学力を徹底的に鍛え上げ、難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "京都府",
    district: "京都市南区",
    station_name: "京都駅",
    access_info: {
      primary_line: "JR各線・近鉄京都線・地下鉄烏丸線",
      hub_station: "京都駅",
      walk_minutes: 13,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR京都駅八条口より徒歩13分、近鉄東寺駅より徒歩5分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "空パラダイム / 海パラダイム",
    commute_time: 25,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "厳格・文武両道・京大実績",
    club_label: "全国レベル",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 96,
    recent_passed_records: "京大合格者数全国第1位・東大・国公立医学部多数合格",
    events: [
      { id: "ev_raku_fes", title: "洛南祭（文化祭＆体育祭）", date: "9月19日(金)〜21日(日)", type: "文化祭", desc: "東寺の境内を借景にした圧巻の集団行動やクラス劇、展示発表！" }
    ],
    special_classes: [
      { title: "東寺毎月21日御影供参拝", desc: "弘法大師の教えに触れ、感謝と自省の心を育む伝統の情操時間！" }
    ],
    school_strengths: [
      "京大合格者数日本一を誇る圧倒的な進学実績！",
      "京都駅八条口徒歩圏、近鉄東寺駅徒歩5分で関西一円から直通通学！",
      "体操・バスケ・陸上など全国制覇を果たすハイレベルなクラブ活動！"
    ],
    life_simulation: "京都駅から東寺の五重塔を眺めながら登校。静かな集中空間で密度の濃い授業を受け、放課後は全国レベルのクラブや自習に汗を流します。",
    parent_summary: "【進学・教育】真言宗東寺派の教育機関を母体とし、京大合格実績で全国トップを争う名門中高一貫共学校。徹底した反復演習と厳しい規律指導により確固たる学力を確立。【環境・費用】京都駅徒歩圏。生活指導と学業指導が一体となった盤石の指導体制が強みです。",
    child_summary: "東寺の五重塔がすぐ目の前にある歴史ある学校！京大に日本一合格していて、勉強もスポーツも本気でやりきるかっこいい先輩たちがいっぱい！",
    tags: ["interest_reading_history", "interest_puzzle_math", "interest_sports_athletics"],
    interest_category_label: "伝統・京大実績・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_todaiji",
    name: "東大寺学園中学校",
    name_ruby: "とうだいじがくえんちゅうがっこう",
    official_url: "https://www.tdj.ac.jp/",
    catchphrase: "東大寺の森のなか。自由闊達と高い知性を育む伝統男子校",
    recommend_phrase: "★ 緑豊かな自然に囲まれ、自由で縛られない環境でのびのび学びたい人におすすめ！",
    photo_url: "assets/images/real_azabu.jpg",
    prefecture: "奈良県",
    district: "奈良市",
    station_name: "高の原駅",
    access_info: {
      primary_line: "近鉄京都線",
      hub_station: "大和西大寺駅 / 京都駅",
      walk_minutes: 20,
      bus_minutes: 5,
      school_bus: false,
      school_bus_note: "近鉄京都線高の原駅より奈良交通直通路線バス5分、または徒歩20分"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 30,
    tuition: 790000,
    gender_type: "boys",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["free"],
    vibe_label: "自由・自然・東大京大実績",
    club_label: "自由",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 96,
    recent_passed_records: "東大・京大・国公立医学部合格率全国屈指",
    events: [
      { id: "ev_tdj_fes", title: "菁々祭（文化祭）", date: "9月6日(土)・7日(日)", type: "文化祭", desc: "自由な男子校の活気が爆発！巨大ゲートや本格的な学術研究展示が見所！" }
    ],
    special_classes: [
      { title: "東大寺境内フィールドワーク", desc: "国宝や世界遺産の歴史の深みを、僧侶でもある教員から直接学ぶ贅沢な探究！" }
    ],
    school_strengths: [
      "東大・京大・医学部への抜群の現役進学率！",
      "校則で生徒を縛らない、大らかで自由闊達な教育文化！",
      "奈良の豊かな緑に囲まれた広大なキャンパスと静かな学習環境！"
    ],
    life_simulation: "高の原駅からスクールエリアを通って登校。放課後は自由なサークル活動や図書室での読書、仲間との議論を時間を忘れて楽しみます。",
    parent_summary: "【進学・教育】東大寺が創設した完全中高一貫男子校。東大・京大・国公立医学部へ毎年抜群の合格者数を送り出す関西最高峰の一角。【環境・費用】奈良市北部の緑豊かな文教地区。自主自律を尊重し、細かい制約を設けずに生徒自身の知的好奇心を大きく伸ばします。",
    child_summary: "自然がいっぱいの広い学校！校則がほとんどなくてすごく自由！面白い研究をしている友達や先生と一緒に、毎日思いきり好きなことに没頭できるよ！",
    tags: ["interest_nature_biology", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "自由・自然・東大京大",
    is_favorite: false
  },

  // ==================== 中国・四国 ====================
  {
    school_id: "sch_hiroshima_gakuin",
    name: "広島学院中学校",
    name_ruby: "ひろしまがくいんちゅうがっこう",
    official_url: "https://www.hiroshimagakuin.ed.jp/",
    catchphrase: "他者のために、他者とともに。高い知性と奉仕の精神を育むイエズス会男子校",
    recommend_phrase: "★ 広島市街を見下ろす丘の上で、手厚い学習指導と豊かな人間性を育みたい人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "広島県",
    district: "広島市西区",
    station_name: "西広島駅",
    access_info: {
      primary_line: "JR山陽本線・広電宮島線",
      hub_station: "広島駅",
      walk_minutes: 15,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "JR西広島駅・広電西広島駅より広電バス「学院前」下車、または高須駅徒歩15分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 740000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "イエズス会・手厚い・医学部実績",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 94,
    recent_passed_records: "東大・京大・広大医学部をはじめとする難関国公立大学多数合格",
    events: [
      { id: "ev_gakuin_fes", title: "翠陵祭（文化祭）", date: "10月4日(土)・5日(日)", type: "文化祭", desc: "学術展示や演劇、伝統のクラブ発表など生徒の活気が溢れる名物祭！" }
    ],
    special_classes: [
      { title: "マグラブ（総合探究・奉仕活動）", desc: "社会の課題に目を向け、他者のために自分ができる行動を実践する探究学習！" }
    ],
    school_strengths: [
      "中国地方トップクラスの東大・京大・国公立医学部合格実績！",
      "栄光学園・六甲学院・上智大学と同じイエズス会教育の強固なグローバルネットワーク！",
      "自然あふれる翠陵の丘にある静かで集中できる学習環境！"
    ],
    life_simulation: "西広島駅から丘を登って清々しい空気の校舎へ。放課後は充実した自習スペースやグラウンドで仲間と励まし合い、知性とたくましさを育みます。",
    parent_summary: "【進学・教育】イエズス会修道会設立の完全中高一貫男子校。中国地方最高峰の進学実績を誇り、特に医学部・難関国公立大への現役合格率が高い。【環境・費用】広島市西区の閑静な丘の上。徹底した基礎学力の養成と人間教育が両立しています。",
    child_summary: "見晴らしのいい丘の上にあるかっこいい学校！勉強もしっかり教えてもらえて、部活や行事も仲間と熱中できる最高の男子校だよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_social_events"],
    interest_category_label: "伝統・医学部実績・男子校",
    is_favorite: false
  },
  {
    school_id: "sch_aiko",
    name: "愛光中学校",
    name_ruby: "あいこうちゅうがっこう",
    official_url: "https://www.aiko.ed.jp/",
    catchphrase: "世界的教養人を育てる。四国最高峰の進学実績を誇るカトリック共学校",
    recommend_phrase: "★ 松山市内からアクセス良好！全国から集まるハイレベルな仲間と切磋琢磨したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "愛媛県",
    district: "松山市",
    station_name: "松山駅",
    access_info: {
      primary_line: "JR予讃線・伊予鉄道",
      hub_station: "松山駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "JR松山駅・伊予鉄松山市駅より直通スクールバス運行（約15分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科（寮生・通学生併設）",
    commute_time: 25,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["both", "global"],
    vibe_label: "四国最高峰・全国区・カトリック",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・国公立大学医学部現役合格率四国第1位",
    events: [
      { id: "ev_aiko_fes", title: "愛光祭（文化祭）", date: "9月14日(日)", type: "文化祭", desc: "寮生と通学生が一体となって創り出すエネルギッシュな展示と模擬店！" }
    ],
    special_classes: [
      { title: "スペイン・ドミニコ会発祥の倫理探究", desc: "愛と光の理念に基づき、真理を探究するグローバル思考の特別講義！" }
    ],
    school_strengths: [
      "東大・京大・国公立医学部合格実績で四国ダントツの日本屈指の名門進学校！",
      "松山駅から専用直通スクールバス運行で通学も安心・快適！",
      "全国から集まる志の高い仲間と生活・学習を共にできる豊かな環境！"
    ],
    life_simulation: "松山駅からの専用バスで爽やかな校舎へ登校。密度の高い授業に取り組み、放課後は図書館や自習室で仲間と勉強。週末は部活動にも熱中します。",
    parent_summary: "【進学・教育】カトリック・ドミニコ会創設の完全中高一貫共学校。四国No.1の大学進学実績を誇り、東大・国公立医学部へ多数合格。【環境・費用】松山市衣山。直通スクールバスを運行。寮制教育のノウハウを活かしたきめ細かな自立指導が強みです。",
    child_summary: "四国で一番頭がいいと言われるすごい学校！全国からいろんな友達が集まっていて、理科の実験室や図書室も大きくてワクワクするよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_social_events"],
    interest_category_label: "四国最高峰・全国区・寮",
    is_favorite: false
  },

  // ==================== 九州・沖縄 ====================
  {
    school_id: "sch_kurume_fusetsu",
    name: "久留米大学附設中学校",
    name_ruby: "くるめだいがくふせつちゅうがっこう",
    official_url: "https://www.kurume-u.ac.jp/site/fusetsu/",
    catchphrase: "豊かな人間性と高い学力。九州最高峰の知性を育む共学校",
    recommend_phrase: "★ 九州全域から集まるトップクラスの仲間とともに、東大・医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "福岡県",
    district: "久留米市",
    station_name: "西鉄久留米駅",
    access_info: {
      primary_line: "西鉄天神大牟田線・JR鹿児島本線",
      hub_station: "西鉄福岡（天神）駅 / 博多駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "西鉄久留米駅・JR久留米駅より直通西鉄通学バス運行（約15分）、福岡天神・博多からも直通快速で通学圏"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 35,
    tuition: 780000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "free"],
    vibe_label: "九州最高峰・共学・医学部実績",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 97,
    recent_passed_records: "東大現役合格者数多数・九大医学部合格者数日本一",
    events: [
      { id: "ev_fusetsu_fes", title: "附設祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "学術展示からバンド、演劇まで生徒が自主自律で運営する熱気あふれる2日間！" }
    ],
    special_classes: [
      { title: "大学レベルの知的好奇心ゼミ", desc: "教科書を超えた学問の真髄に触れる、教員オリジナル教材による探究授業！" }
    ],
    school_strengths: [
      "東大・九大医学部への合格実績で九州No.1！",
      "福岡市内（天神・博多）からも西鉄電車・JRの快速で無理なく通学可能！",
      "男女共学の明るく自由闊達な雰囲気の中で、互いをリスペクトし合える環境！"
    ],
    life_simulation: "西鉄久留米駅からの通学バスで校舎へ。朝から集中して高度な授業を受け、放課後は仲間とディスカッションしたり部活でリフレッシュ。充実した青春の日々です。",
    parent_summary: "【進学・教育】九州を代表する最高峰の共学中高一貫校。東大および国公立大医学部への現役合格率が極めて高く、自立した学習姿勢を育成します。【環境・費用】福岡市内からも多くの生徒が通学。細かい校則で縛らず、生徒の自主性を重んじる自由闊達な校風です。",
    child_summary: "九州でトップクラスの共学校！勉強がすごくできるのに、みんな明るくて面白い！部活動も文化祭も本気で楽しめる最高の環境だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_social_events"],
    interest_category_label: "九州最高峰・共学・医進",
    is_favorite: false
  },
  {
    school_id: "sch_lasalle",
    name: "ラ・サール中学校",
    name_ruby: "らさーるちゅうがっこう",
    official_url: "https://www.lasalle.ed.jp/",
    catchphrase: "信仰・希望・愛。義務を果たす自律心と全国屈指の学力を誇るカトリック男子校",
    recommend_phrase: "★ 規律正しく整った環境で、全国から集まる仲間と一生モノの絆を結びたい人におすすめ！",
    photo_url: "assets/images/real_kaisei.jpg",
    prefecture: "鹿児島県",
    district: "鹿児島市",
    station_name: "谷山駅",
    access_info: {
      primary_line: "JR指宿枕崎線・鹿児島市電",
      hub_station: "鹿児島中央駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "市電谷山電停より徒歩8分、JR谷山駅より徒歩15分（鹿児島中央駅からJR約12分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（全寮制・通学制併設）",
    commute_time: 25,
    tuition: 820000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "名門・文武両道・寮生活",
    club_label: "非常に盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 96,
    recent_passed_records: "東大・京大・国公立大医学部合格実績全国トップクラス",
    events: [
      { id: "ev_lasalle_fes", title: "ラ・サール学園祭", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "寮生と通学生が力を合わせた熱気あふれる展示・ステージ発表！" }
    ],
    special_classes: [
      { title: "夜間自習指導・チューターゼミ", desc: "教員とOBが一体となって一人ひとりの質問に徹底的に答える学習指導！" }
    ],
    school_strengths: [
      "東大・国公立医学部合格実績で全国に名を轟かせる伝統の名門男子校！",
      "鹿児島中央駅から電車で約12分、谷山駅から徒歩圏内の好立地！",
      "「兄弟愛」で結ばれた強固な同窓生ネットワークが生涯の財産になる！"
    ],
    life_simulation: "谷山駅から松林の風を感じて登校。密度の高い授業と放課後の部活動、夜は自習室で徹底的に学習。仲間と寝食を共にし、自立心を大きく育みます。",
    parent_summary: "【進学・教育】ラ・サール修道会設立の完全中高一貫男子校。東大・国公立医学部への圧倒的な進学実績。規則正しい生活習慣と自律の精神を確立させます。【環境・費用】鹿児島市小松原。鹿児島中央駅からJRで直通。全国から志の高い生徒が集まります。",
    child_summary: "全国的に有名なすごい男子校！運動も勉強もみんな一生懸命で、先生たちも熱心。一生付き合える最高の親友ができる学校だよ！",
    tags: ["interest_sports_athletics", "interest_puzzle_math", "interest_social_events"],
    interest_category_label: "名門男子・寮・全国区",
    is_favorite: false
  },
  {
    school_id: "sch_showa_yakka",
    name: "昭和薬科大学附属中学校",
    name_ruby: "しょうわやっかだいがくふぞくちゅうがっこう",
    official_url: "https://www.showayakka-jh.ed.jp/",
    catchphrase: "高い知性と豊かな人間性。沖縄県内トップの大学進学実績を誇る共学校",
    recommend_phrase: "★ スクールバス完備！沖縄で国公立大・医学部を目指して手厚く学びたい人におすすめ！",
    photo_url: "assets/images/real_shibaura.jpg",
    prefecture: "沖縄県",
    district: "浦添市",
    station_name: "てだこ浦西駅",
    access_info: {
      primary_line: "ゆいレール（沖縄都市モノレール）",
      hub_station: "県庁前駅 / 那覇空港駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "ゆいレールてだこ浦西駅・那覇市内各所より学校専用スクールバス直通運行（約10〜15分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "support"],
    vibe_label: "沖縄最高峰・理系・手厚い",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "東大・京大・琉球大医学部をはじめとする難関国公立大学へ県内最多合格",
    events: [
      { id: "ev_showa_fes", title: "薬附祭（文化祭）", date: "10月18日(土)・19日(日)", type: "文化祭", desc: "科学実験展示、英語プレゼンテーション、活気あふれる舞台発表！" }
    ],
    special_classes: [
      { title: "メディカル＆サイエンス探究ゼミ", desc: "医師や薬学研究者による特別講義と本格的な理科実験カリキュラム！" }
    ],
    school_strengths: [
      "沖縄県内でNo.1の国公立大医学部・難関大合格実績！",
      "ゆいレールてだこ浦西駅や那覇市内各方面から充実の直通スクールバス運行！",
      "緑豊かな浦添の高台にある、開放的で静かな学習環境！"
    ],
    life_simulation: "専用スクールバスで浦添の丘の上にあるキャンパスへ登校。放課後は自習室や質問コーナーで疑問を解決し、部活動にも積極的に取り組みます。",
    parent_summary: "【進学・教育】沖縄県内トップの進学校として名高い完全中高一貫共学校。琉球大学医学部をはじめとする全国の医学部・難関国公立大へ抜群の合格実績。【環境・費用】浦添市。モノレール駅等からスクールバスを運行し、安全な通学路を確保しています。",
    child_summary: "沖縄でいちばん頭がいいと言われる憧れの学校！理科の実験室が充実していて、お医者さんや科学者を目指す仲間と一緒に楽しく勉強できるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_crafting_making"],
    interest_category_label: "沖縄最高峰・理数・医進",
    is_favorite: false
  },

  // ==================== 47都道府県追加代表校 ====================
// ==================== 東北追加 ====================
  {
    school_id: "sch_iwate_fuzoku",
    name: "岩手大学教育学部附属中学校",
    name_ruby: "いわてだいがくきょういくがくぶふぞくちゅうがっこう",
    official_url: "https://www.edu.iwate-u.ac.jp/fuchu/",
    catchphrase: "自ら学び深く探究する、自主自立の精神を育む岩手県の名門国立中",
    recommend_phrase: "★ 高い知的好奇心と自由闊達な仲間とともに、深い探究学習に打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "岩手県",
    district: "盛岡市上田",
    station_name: "盛岡駅",
    access_info: {
      primary_line: "JR東北本線・IGRいわて銀河鉄道",
      hub_station: "盛岡駅",
      walk_minutes: 5,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "盛岡駅東口より岩手県交通バス「岩手大学前」下車徒歩2分"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 220000,
    gender_type: "coed",
    category: "national",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "自主探究・自由",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "盛岡第一高校など県内最難関高校・難関大へ圧倒的な進学実績",
    events: [
      { id: "ev_iwate_setsumei", title: "学校説明会＆施設見学", date: "9月27日(土)", type: "学校説明会", desc: "大学キャンパスに隣接した緑豊かな教育環境と探究授業を公開します。" }
    ],
    special_classes: [
      { title: "大学連携サイエンス探究", desc: "岩手大学の教授・研究室と連携したハイレベルな実験・フィールドワーク！" }
    ],
    school_strengths: ["岩手県トップクラスの学習意欲の高い仲間が集う学習環境！", "国立大学連携による先端的な教育プログラム！"],
    life_simulation: "盛岡駅から自転車や路線バスで登校。大学キャンパス隣接の開放的な環境で主体的な課題研究に取り組みます。",
    parent_summary: "【進学・教育】岩手県内トップの教育水準を誇る国立中。盛岡第一高校などトップ高への合格者を多数輩出。【環境・費用】国立のため授業料無償（諸経費のみ）。",
    child_summary: "みんなで調べたり実験したりする授業がとっても面白い！岩手で一番勉強や部活に熱中できる学校だよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_reading_history"],
    interest_category_label: "岩手最高峰・国立探究",
    is_favorite: false
  },
  {
    school_id: "sch_akita_minami",
    name: "秋田県立秋田南高等学校中等部",
    name_ruby: "あきたけんりつあきたみなみこうとうがっこうちゅうとうぶ",
    official_url: "https://akitaminami-h.wixsite.com/akitaminami",
    catchphrase: "グローバルリーダーの育成！豊かな教養と発信力を磨く公立中高一貫校",
    recommend_phrase: "★ 英語や国際交流に興味があり、秋田から世界へ羽ばたきたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "秋田県",
    district: "秋田市南通",
    station_name: "羽後牛島駅",
    access_info: {
      primary_line: "JR羽越本線・奥羽本線",
      hub_station: "秋田駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "秋田駅より路線バス約12分、羽後牛島駅より徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科中高一貫",
    commute_time: 25,
    tuition: 180000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["global", "both"],
    vibe_label: "グローバル・文武両道",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 93,
    recent_passed_records: "東大・東北大・国際教養大（AIU）をはじめとする難関国公立大学多数合格",
    events: [
      { id: "ev_akita_open", title: "中等部オープンスクール", date: "10月4日(土)", type: "体験授業", desc: "英語アクティブラーニングや中高合同の部活動体験を実施します。" }
    ],
    special_classes: [
      { title: "グローバルイングリッシュ・ワークショップ", desc: "ネイティブ教員や留学生と英語で白熱したディスカッションを行う体験授業！" }
    ],
    school_strengths: ["秋田県の公立中高一貫トップ校としての手厚い指導！", "国際教養大学（AIU）との連携教育！"],
    life_simulation: "秋田駅周辺や羽後牛島駅から自転車で登校。放課後は充実した文化系・運動系の部活動で仲間と切磋琢磨します。",
    parent_summary: "【進学・教育】秋田県初の県立中高一貫校。高い英語発信力と難関国公立大学進学実績が強み。【費用】公立校のため学費負担が極めて少ないのが魅力です。",
    child_summary: "英語をたくさん話せるようになったり、みんなの前で堂々と発表できるようになるかっこいい学校だよ！",
    tags: ["interest_social_events", "interest_digital_tech", "interest_reading_history"],
    interest_category_label: "秋田・公立一貫・国際教養",
    is_favorite: false
  },
  {
    school_id: "sch_toohhoku_sakura",
    name: "山形県立東桜学館中学校",
    name_ruby: "やまがたけんりつとうおうがっかんちゅうがっこう",
    official_url: "https://www.touohgakkan-jhh.ed.jp/",
    catchphrase: "未来を拓く高い志！理数教育と人間力を培う山形の県立中高一貫校",
    recommend_phrase: "★ 充実した実験設備とICTで、科学技術や社会課題の解決に挑みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "山形県",
    district: "東根市中央南",
    station_name: "さくらんぼ東根駅",
    access_info: {
      primary_line: "山形新幹線・JR奥羽本線",
      hub_station: "山形駅",
      walk_minutes: 12,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "さくらんぼ東根駅東口より徒歩12分、自転車通学多数"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科中高一貫",
    commute_time: 30,
    tuition: 180000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "both"],
    vibe_label: "理数探究・文武両道",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 91,
    recent_passed_records: "東大・東北大・山形大学医学部など難関大へ現役合格多数",
    events: [
      { id: "ev_sakura_bunkasai", title: "東桜祭（文化祭）", date: "9月13日(土)", type: "文化祭", desc: "科学部・ロボコン展示や生徒主体のステージ発表が盛り上がります。" }
    ],
    special_classes: [
      { title: "東桜探究（理数サイエンスプログラム）", desc: "地元企業や大学と連携したフィールドワーク＆科学実験！" }
    ],
    school_strengths: ["文部科学省スーパーサイエンスハイスクール（SSH）指定校！", "最新の実験室・ICT講義室完備の近代キャンパス！"],
    life_simulation: "さくらんぼ東根駅から自転車で登校。広大なグラウンドと近代的な校舎で思いっきり学びと部活に打ち込みます。",
    parent_summary: "【進学・教育】山形県内唯一の県立中等一貫校。SSH指定による先端理数教育と高い進学実績が強み。【費用】公立校。",
    child_summary: "新しくてピカピカの実験室やパソコン室がたくさん！理科の実験やロボット作りが大好きな子に最高だよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_crafting_making"],
    interest_category_label: "山形・公立一貫・理数SSH",
    is_favorite: false
  },
  {
    school_id: "sch_fukushima_seikei",
    name: "福島成蹊中学校",
    name_ruby: "ふくしませいけいちゅうがっこう",
    official_url: "https://www.f-seikei.ed.jp/",
    catchphrase: "桃李もの言わざれども下自ずから蹊を成す。手厚い個別指導と高い進学力の中高一貫校",
    recommend_phrase: "★ 先生方の手厚いサポートを受けながら、難関大学や医学部を本気で目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "福島県",
    district: "福島市腰浜町",
    station_name: "福島駅",
    access_info: {
      primary_line: "JR東北本線・山形新幹線・阿武隈急行",
      hub_station: "福島駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR福島駅東口より専用スクールバスおよび福島交通バス直通約10分運行"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "一貫コース（中高一貫）",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い補習・難関進学",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "東大・東北大・福島県立医科大医学部など国公立大多数合格",
    events: [
      { id: "ev_seikei_taiken", title: "プレテスト＆体験オープンスクール", date: "10月18日(土)", type: "体験授業", desc: "入試体験と先輩たちの学校生活紹介、実験教室を実施します。" }
    ],
    special_classes: [
      { title: "放課後ステップアップ個別ゼミ", desc: "放課後の自習室で専任教員がマンツーマンで疑問に答える徹底演習！" }
    ],
    school_strengths: ["一人ひとりの進度に応じた手厚い学習サポート！", "駅からの直通スクールバス運行で通学も安心！"],
    life_simulation: "福島駅から専用スクールバスで校門前まで直行。放課後は自習館で集中して課題や質問学習を行います。",
    parent_summary: "【進学・教育】福島県トップクラスの私立中高一貫進学校。塾いらずの手厚い学習支援と医学部・難関大実績。【通学】福島駅直通バス完備。",
    child_summary: "先生がいつも優しく勉強を教えてくれるから安心！みんなで楽しく教え合いながら学べるあったかい学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "福島・私立共学・手厚い医進",
    is_favorite: false
  },

  // ==================== 関東追加 ====================
  {
    school_id: "sch_meikei",
    name: "茗溪学園中学校",
    name_ruby: "めいけいがくえんちゅうがっこう",
    official_url: "https://www.meikei.ac.jp/",
    catchphrase: "国際バカロレア（IB）認定校！豊かな自然と世界標準の探究教育を実践する自由闊達な名門",
    recommend_phrase: "★ 荒川沖駅・つくば駅から直通スクールバスでアクセス抜群！世界基準の探究学習やラグビーなど課外活動に熱中したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "茨城県",
    district: "つくば市稲荷前",
    station_name: "荒川沖駅",
    access_info: {
      primary_line: "JR常磐線・つくばエクスプレス",
      hub_station: "荒川沖駅・ひたちのうしく駅・つくば駅",
      walk_minutes: 0,
      bus_minutes: 12,
      school_bus: true,
      school_bus_note: "JR荒川沖駅西口より学校専用直通スクールバス約12分（ひたちのうしく駅・つくば駅からも直通運行、自転車通学可）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "MG／IB（国際バカロレア）コース",
    commute_time: 15,
    tuition: 920000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["global", "stem", "free"],
    vibe_label: "国際IB・自由闊達",
    club_label: "盛ん（全国レベル）",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 96,
    recent_passed_records: "東大・筑波大・国公立大・早慶上智・海外有名大学へ多数進学",
    events: [
      { id: "ev_meikei_open", title: "茗溪学園 オープンキャンパス", date: "9月20日(土)", type: "体験授業", desc: "IB探究ワークショップや広大な自然キャンパスでの実験・部活体験ができます！" }
    ],
    special_classes: [
      { title: "個人課題研究（茗溪メソッド）", desc: "中学3年間にわたり自分の大好きなテーマをとことん追究して論文を執筆！" }
    ],
    school_strengths: [
      "荒川沖駅西口から専用スクールバス直通約12分の抜群の通学アクセス！",
      "国際バカロレア認定校としての高度な思考力・英語プレゼン教育！",
      "広大な緑に囲まれた恵まれたキャンパスで自主自律の精神を育成！"
    ],
    life_simulation: "荒川沖駅から直通バスで緑豊かな校舎へ。午前はグループディスカッション中心の授業、午後は広大なグラウンドで部活や個人研究に没頭します。",
    parent_summary: "【進学・教育】筑波研究学園都市の地の利を活かした先進教育。国際バカロレア（IB）認定校で海外大や難関大への高い進路実績。【環境・通学】荒川沖駅から直通スクールバス運行で通学安心。自由で伸びやかな校風が特徴です。",
    child_summary: "荒川沖駅から専用バスですぐ！大自然に囲まれた広いキャンパスで、自分の好きな研究や部活に夢中になれるワクワクがいっぱいの学校だよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_sports_athletics", "interest_social_events"],
    interest_category_label: "国際IB・探究・自由闊達",
    is_favorite: false
  },
  {
    school_id: "sch_tsuchiura_nichidai",
    name: "土浦日本大学中等教育学校",
    name_ruby: "つちうらにほんだいがくちゅうとうきょういくがっこう",
    official_url: "https://www.tng.ac.jp/sec-sch/",
    catchphrase: "日本大学の充実した連携と高い進学指導。手厚いサポートで夢を育てる完全中高一貫校",
    recommend_phrase: "★ 土浦駅・荒川沖駅からスクールバスで直通！日大への進学権を確保しながら国公立大・難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_hiroo.jpg",
    prefecture: "茨城県",
    district: "土浦市小松ヶ丘町",
    station_name: "土浦駅",
    access_info: {
      primary_line: "JR常磐線",
      hub_station: "土浦駅・荒川沖駅・つくば駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR土浦駅東口・西口より学校直通バス約10分、荒川沖駅・つくば駅方面からもスクールバス運行（自転車通学可能）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "前期・後期中高一貫課程",
    commute_time: 15,
    tuition: 840000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["both", "support"],
    vibe_label: "日大連携・文武両道",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 55,
    match_rate_child: 95,
    recent_passed_records: "日本大学各学部（医・歯・理工等）への特別推薦枠＋国公立大・早慶上理多数合格",
    events: [
      { id: "ev_tnichidai_setsu", title: "土浦日大中等 学校説明会・見学会", date: "10月4日(土)", type: "学校説明会", desc: "最新のICT学習施設や日大連携プログラムの魅力を詳しく紹介します。" }
    ],
    special_classes: [
      { title: "グローバルスタディ・ICT講座", desc: "1人1台タブレットを活用した少人数アクティブラーニングと英会話！" }
    ],
    school_strengths: [
      "土浦市内・荒川沖駅から直通アクセス＆充実のスクールバス網！",
      "日本大学への内部推薦権を保持したまま国公立大学への挑戦が可能！",
      "放課後の手厚い習熟度別補習体制で塾いらずの手厚い学習環境！"
    ],
    life_simulation: "土浦駅や荒川沖駅からバスまたは自転車で元気に登校。放課後は最新の自習室で勉強したり、部活動で仲間と切磋琢磨します。",
    parent_summary: "【進学・教育】日本大学の附属連携メリットを最大限に活かしつつ、難関国公立大学への手厚い進学指導体制を完備。【環境・通学】土浦市内立地で荒川沖駅からも至近。安全な通学環境と面倒見の良い指導が好評です。",
    child_summary: "土浦駅や荒川沖駅からバスや自転車ですぐ！勉強も部活も両方思いっきり楽しめて、先生がいつでも優しく教えてくれるよ！",
    tags: ["interest_science_space", "interest_sports_athletics", "interest_reading_history"],
    interest_category_label: "日大附属連携・手厚い指導・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_edotoride",
    name: "江戸川学園取手中学校",
    name_ruby: "えどがわがくえんとりでちゅうがっこう",
    official_url: "https://www2.e-t.ed.jp/",
    catchphrase: "心豊かなリーダーを育てる規律ある進学校。医科・東大・難関大コース編成",
    recommend_phrase: "★ 医学部や最難関大を目指し、充実した理科実験室や規律ある環境で学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "茨城県",
    district: "取手市西",
    station_name: "取手駅",
    access_info: {
      primary_line: "JR常磐線・関東鉄道常総線",
      hub_station: "取手駅・柏駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: true,
      school_bus_note: "JR取手駅西口より学校直通スクールバス約8分運行（TX守谷駅からも直通バス有）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "医科／東大／難関大ジュニアコース",
    commute_time: 30,
    tuition: 890000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "manners"],
    vibe_label: "医科進学・情操規律",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "国公立大医学部・東大・京大・早慶上智など毎年多数の合格実績",
    events: [
      { id: "ev_edo_bunkasai", title: "紫峰祭（文化祭）", date: "9月27日(土)・28日(日)", type: "文化祭", desc: "医科コースの研究発表やロボット展示、迫力ある演劇など見どころ満載！" }
    ],
    special_classes: [
      { title: "医科ジュニア探究講座", desc: "大学病院の現役医師による特別講義や医療倫理ディスカッション！" }
    ],
    school_strengths: ["茨城県内屈指の医学部・難関大合格実績！", "充実のスクールバス網（取手駅・守谷駅発着）！"],
    life_simulation: "取手駅や守谷駅からスクールバスで緑豊かな広大なキャンパスへ。放課後は自習スペースや部活動で充実した時間を過ごします。",
    parent_summary: "【進学・教育】コース制教育により中学生から目的意識高く学べる私立中。道徳教育と医学部・難関大実績の両立。【通学】複数駅からスクールバス運行。",
    child_summary: "お医者さんや科学者になりたい夢を本気で応援してくれる！先生も優しくて実験がたくさんできるよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_reading_history"],
    interest_category_label: "茨城名門・医科コース・進学",
    is_favorite: false
  },
  {
    school_id: "sch_sano_nichidai",
    name: "佐野日本大学中等教育学校",
    name_ruby: "さのにほんだいがくちゅうとうきょういくがっこう",
    official_url: "https://ss.sano-nichidai.jp/",
    catchphrase: "6カ年一貫教育でグローバルリーダーを育成！日大連携と難関国立進学を両立",
    recommend_phrase: "★ 日本大学への進学権を確保しながら、難関国立大学や海外大学にも挑戦したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "栃木県",
    district: "佐野市石塚町",
    station_name: "佐野駅",
    access_info: {
      primary_line: "東武佐野線・JR両毛線",
      hub_station: "佐野駅・小山駅・足利駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "佐野駅・小山駅・足利駅・太田駅・館林駅等各方面から充実の広域直通スクールバス運行"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "前期課程（中高一貫）",
    commute_time: 35,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["both", "global"],
    vibe_label: "大学連携・文武両道",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 55,
    match_rate_child: 89,
    recent_passed_records: "日本大学各学部（医学部含む）への推薦枠＋国公立大・早慶上理多数合格",
    events: [
      { id: "ev_sano_open", title: "オープンスクール＆部活体験", date: "10月11日(土)", type: "体験授業", desc: "広大な人工芝グラウンドや全天候型スポーツ施設、ICT授業を体験できます。" }
    ],
    special_classes: [
      { title: "日大連携アカデミックプログラム", desc: "日本大学理工学部・歯学部等との共同セミナーや先端研究体験！" }
    ],
    school_strengths: ["広大なキャンパスに全国トップレベルのスポーツ・文化施設完備！", "北関東各県を網羅する安心安全なスクールバス網！"],
    life_simulation: "自宅近くの発着所から直通スクールバスで楽々登校。放課後は最新設備の中で部活動や自習に取り組みます。",
    parent_summary: "【進学・教育】日本大学の附属校としての安心感と難関大進学指導のハイブリッド。【通学】栃木・群馬・埼玉・茨城各方面からスクールバス運行。",
    child_summary: "広い人工芝のグラウンドや体育館がすごい！勉強も部活もどっちも全力で楽しみたい人にぴったりだよ！",
    tags: ["interest_sports_athletics", "interest_digital_tech", "interest_social_events"],
    interest_category_label: "栃木名門・大学連携・総合力",
    is_favorite: false
  },
  {
    school_id: "sch_gunma_fuzoku",
    name: "群馬大学共同教育学部附属中学校",
    name_ruby: "ぐんまだいがくきょうどうきょういくがくぶふぞくちゅうがっこう",
    official_url: "https://jhs.edu.gunma-u.ac.jp/",
    catchphrase: "自由と責任を重んじ、高い知性と豊かな情操を育む群馬県の名門国立中学校",
    recommend_phrase: "★ 伝統ある自主的な校風の中で、仲間と議論し高め合う深い学びをしたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "群馬県",
    district: "前橋市上沖町",
    station_name: "中央前橋駅",
    access_info: {
      primary_line: "上毛電気鉄道・JR両毛線",
      hub_station: "前橋駅・高崎駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "中央前橋駅より徒歩10分、JR前橋駅より自転車約15分または路線バス"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 240000,
    gender_type: "coed",
    category: "national",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "自由闊達・自主研究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 92,
    recent_passed_records: "前橋高校・高崎高校・前橋女子高・高崎女子高など県内最上位校へ毎年多数進学",
    events: [
      { id: "ev_gunma_setsumei", title: "学校説明会＆公開授業", date: "10月25日(土)", type: "学校説明会", desc: "大学研究校ならではの質の高い授業参観と教育方針を詳しく説明します。" }
    ],
    special_classes: [
      { title: "探究リサーチゼミ", desc: "自らテーマを設定して1年間調査研究を行う本格的な探究活動！" }
    ],
    school_strengths: ["群馬県内トップレベルの学力層が集う切磋琢磨の環境！", "国立大学附属ならではの自由で先進的なカリキュラム！"],
    life_simulation: "前橋駅や中央前橋駅から自転車でイチョウ並木を通って登校。生徒会活動や合唱祭など生徒主体で熱狂的に取り組みます。",
    parent_summary: "【進学・教育】群馬県最難関の国立中学校。前橋高・高崎高をはじめとするトップ高校への登竜門。【費用】国立のため低負担。",
    child_summary: "自分でやりたいことをトコトン調べられる授業がすごく面白い！友達もみんな優しくて面白い人ばかりだよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "群馬最高峰・国立附属",
    is_favorite: false
  },

  // ==================== 甲信越・北陸追加 ====================
  {
    school_id: "sch_niigata_meikun",
    name: "新潟明訓中学校",
    name_ruby: "にいがためいくんちゅうがっこう",
    official_url: "https://www.niigata-meikun.ed.jp/",
    catchphrase: "信義と剛健。亀田の広大な新キャンパスで確かな学力と豊かな心を育てる私立中",
    recommend_phrase: "★ 素晴らしい自然環境と充実した設備で、勉強も部活動も高いレベルで両立したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "新潟県",
    district: "新潟市江南区亀田向陽",
    station_name: "亀田駅",
    access_info: {
      primary_line: "JR信越本線",
      hub_station: "新潟駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR新潟駅南口および亀田駅より学校直通バス多数運行（朝夕ピーク時5分間隔）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 25,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "文武両道・手厚い指導",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 57,
    match_rate_child: 91,
    recent_passed_records: "東大・東北大・新潟大学医学部など難関国公立大学へ高い合格実績",
    events: [
      { id: "ev_meikun_fes", title: "明訓祭（文化祭）", date: "9月6日(土)・7日(日)", type: "文化祭", desc: "広大なアリーナでのブラスバンド演奏やクラス展示、部活動公開が人気です。" }
    ],
    special_classes: [
      { title: "明訓メソッド探究ワーク", desc: "問題解決力とプレゼン力を高める少人数制アクティブラーニング授業！" }
    ],
    school_strengths: ["広大な敷地に充実した体育館・室内練習場・自習ブースを完備！", "新潟駅直結の直通バスで通学利便性抜群！"],
    life_simulation: "新潟駅から直通バスで緑豊かな亀田キャンパスへ。放課後は全国レベルの部活動や放課後個別指導に励みます。",
    parent_summary: "【進学・教育】新潟県を代表する伝統名門私立校。中高一貫による先取り学習と医学部・国公立大実績。【通学】新潟駅南口から直通バス完備。",
    child_summary: "とにかく校舎が広くてきれい！野球場も体育館も本格的で、部活も勉強も思いっきり打ち込めるよ！",
    tags: ["interest_sports_athletics", "interest_science_space", "interest_digital_tech"],
    interest_category_label: "新潟名門・文武両道・共学",
    is_favorite: false
  },
  {
    school_id: "sch_katayama_gakuen",
    name: "片山学園中学校",
    name_ruby: "かたやまがくえんちゅうがっこう",
    official_url: "https://www.katayamagakuen.jp/",
    catchphrase: "立志の学び舎。立山連峰を望む大自然の中で東大・国公立医学部をめざす",
    recommend_phrase: "★ 全寮制またはスクールバス通学で、手厚い徹底指導と豊かな人間力を身につけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "富山県",
    district: "富山市東石坂町",
    station_name: "富山駅",
    access_info: {
      primary_line: "北陸新幹線・あいの風とやま鉄道・高山本線",
      hub_station: "富山駅",
      walk_minutes: 0,
      bus_minutes: 25,
      school_bus: true,
      school_bus_note: "JR富山駅・高岡駅・新高岡駅・魚津駅など富山県内全域より専用スクールバス運行（全寮制併設）"
    },
    can_walk: false,
    can_bicycle: false,
    course_name: "普通科（全寮制・通学制）",
    commute_time: 30,
    tuition: 840000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "東大医進・全寮制選択可",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "東大・京大・富山大学医学部など国公立大・医学部へ驚異の現役進学率",
    events: [
      { id: "ev_katayama_open", title: "オープンキャンパス＆寮見学", date: "10月18日(土)", type: "学校説明会", desc: "快適な男子寮・女子寮の見学と個別進学相談、理科実験教室を実施！" }
    ],
    special_classes: [
      { title: "夜間学習サポーティング（寮・通学生共通）", desc: "夜間まで教員が常駐し、一人ひとりの疑問をその日のうちに完全解消！" }
    ],
    school_strengths: ["富山県内随一の東大・医学部進学実績を誇る完全中高一貫校！", "全国から生徒が集う安心安全な学生寮とスクールバス完備！"],
    life_simulation: "専用スクールバスまたは寮の食堂で朝食をとって登校。立山連峰を望む絶景の中で夜遅くまで手厚い指導を受けられます。",
    parent_summary: "【進学・教育】富山県唯一の私立中高一貫校。驚異的な医学部・東大合格実績。通学バスと学生寮を完備し学習に完全専念できる環境です。",
    child_summary: "立山連峰が見える大自然の学校！寮に入って全国の友達と暮らすこともできるし、バスで通うこともできるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_social_events"],
    interest_category_label: "富山最高峰・全寮制併設・医進",
    is_favorite: false
  },
  {
    school_id: "sch_seiryo_junior",
    name: "星稜中学校",
    name_ruby: "せいりょうちゅうがっこう",
    official_url: "https://www.seiryo-hs.jp/jh/",
    catchphrase: "誠実にして社会に役立つ人間の育成。高い進学力と全国レベルの部活動",
    recommend_phrase: "★ 難関大学を目指す手厚い学習指導と、多彩で熱気あふれる部活動を両立させたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "石川県",
    district: "金沢市小坂町",
    station_name: "東金沢駅",
    access_info: {
      primary_line: "IRいしかわ鉄道",
      hub_station: "金沢駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東金沢駅より徒歩15分（自転車5分）、金沢駅より北鉄バス直通あり"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫理数・進学コース",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "support"],
    vibe_label: "文武両道・手厚い進学",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "金沢大学医学部・難関国公立大学・難関私立大学へ多数合格",
    events: [
      { id: "ev_seiryo_open", title: "星稜中オープンスクール", date: "9月20日(土)", type: "体験授業", desc: "ICTを使った体験授業や部活動見学会、校内ツアーを実施します。" }
    ],
    special_classes: [
      { title: "星稜サイエンス＆キャリアゼミ", desc: "地元医療機関や企業で活躍する卒業生を招いた実践的なキャリア探究！" }
    ],
    school_strengths: ["全国に名を馳せる圧倒的なスポーツ・文化活動の実績！", "放課後補習や質問コーナーなどきめ細やかな学習指導体制！"],
    life_simulation: "東金沢駅や金沢市内から自転車や路線バスで登校。活気ある校舎で友達と切磋琢磨しながら放課後学習や部活に励みます。",
    parent_summary: "【進学・教育】石川県有数の伝統校。中高一貫の先取りカリキュラムと金沢大・医学部実績。【環境】文武両道のエネルギッシュな校風。",
    child_summary: "部活が全国レベルですごく活気がある！先輩たちも優しくて、勉強もスポーツも思いっきり頑張れる学校だよ！",
    tags: ["interest_sports_athletics", "interest_social_events", "interest_digital_tech"],
    interest_category_label: "石川名門・文武両道・活発",
    is_favorite: false
  },
  {
    school_id: "sch_fukui_fuzoku",
    name: "福井大学教育学部附属中学校",
    name_ruby: "ふくいだいがくきょういくがくぶふぞくちゅうがっこう",
    official_url: "https://www.f-edu.u-fukui.ac.jp/~fuzoku-j/",
    catchphrase: "自主・自律・協働。確かな知性と豊かな情操を育む福井県の最高峰国立中",
    recommend_phrase: "★ 質の高い探究的な授業で仲間と深く議論し、高い学力を身につけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "福井県",
    district: "福井市二の宮",
    station_name: "福井駅",
    access_info: {
      primary_line: "ハピラインふくい・えちぜん鉄道",
      hub_station: "福井駅",
      walk_minutes: 0,
      bus_minutes: 12,
      school_bus: false,
      school_bus_note: "JR福井駅西口より京福バス「二の宮」下車徒歩3分、自転車通学多数"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科",
    commute_time: 25,
    tuition: 230000,
    gender_type: "coed",
    category: "national",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "stem"],
    vibe_label: "自主協働・探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "藤島高校をはじめとする県内最難関高校・難関大へ毎年抜群の進学実績",
    events: [
      { id: "ev_fukui_setsumei", title: "附属中等説明会＆授業公開", date: "10月25日(土)", type: "学校説明会", desc: "大学研究機関ならではの深い探究授業と生徒の自律的な学校生活を公開。" }
    ],
    special_classes: [
      { title: "大学連携課題研究プロジェクト", desc: "福井大学の先端研究施設を活用したサイエンスワークショップ！" }
    ],
    school_strengths: ["藤島高校への圧倒的な進学実績を誇る県内トップクラスの学習環境！", "生徒一人ひとりの主体的な発信力を育てる研究授業！"],
    life_simulation: "福井駅周辺から自転車で登校。緑に囲まれた静かなキャンパスで課題研究やディスカッションに熱中します。",
    parent_summary: "【進学・教育】福井県トップ校・藤島高校への登竜門として抜群の実績。【費用】国立のため授業料無償。",
    child_summary: "みんなで意見を出し合って問題を解決する授業が超面白い！藤島高校や難関大学を目指す仲間がたくさんいるよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_digital_tech"],
    interest_category_label: "福井最高峰・国立探究",
    is_favorite: false
  },
  {
    school_id: "sch_sundai_kofu",
    name: "駿台甲府中学校",
    name_ruby: "すんだいこうふちゅうがっこう",
    official_url: "https://www.sundai-kofu.ed.jp/",
    catchphrase: "駿台予備学校グループの圧倒的指導力！一人ひとりの夢を叶える山梨屈指の進学校",
    recommend_phrase: "★ 駿台グループならではの手厚い学習システムで、最難関大学・医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "山梨県",
    district: "甲府市塩部",
    station_name: "甲府駅",
    access_info: {
      primary_line: "JR中央本線・身延線",
      hub_station: "甲府駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: true,
      school_bus_note: "JR甲府駅北口より専用スクールバス約8分運行、自転車通学も可能"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 25,
    tuition: 740000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "駿台連携・医科進学",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 57,
    match_rate_child: 91,
    recent_passed_records: "東大・京大・山梨大学医学部など難関大・医学部に高い現役合格率",
    events: [
      { id: "ev_sundai_taiken", title: "駿台甲府オープンキャンパス", date: "10月11日(土)", type: "体験授業", desc: "駿台のノウハウを凝縮した知的好奇心を刺激する特別体験授業を実施！" }
    ],
    special_classes: [
      { title: "駿台アカデミックサプリ＆個別演習", desc: "駿台予備学校の最新データベースと直結した個別最適化学習指導！" }
    ],
    school_strengths: ["駿台グループの豊富な大学入試データと指導ノウハウ！", "甲府駅北口からの直通スクールバス運行で通学便利！"],
    life_simulation: "甲府駅からスクールバスで塩部キャンパスへ。放課後は自習室で専任チューターに質問しながら学習を深めます。",
    parent_summary: "【進学・教育】駿台予備学校系列の中高一貫校。山梨大学医学部をはじめ難関大への指導力は県内トップクラス。【通学】甲府駅スクールバス運行。",
    child_summary: "勉強のコツを先生が分かりやすく教えてくれるから、ぐんぐん問題が解けるようになって楽しい学校だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_digital_tech"],
    interest_category_label: "山梨名門・駿台連携・医学部",
    is_favorite: false
  },
  {
    school_id: "sch_suwa_seiryo",
    name: "長野県諏訪清陵高等学校附属中学校",
    name_ruby: "ながのけんすわせいりょうこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://fuzoku.suwaseiryo.ed.jp/",
    catchphrase: "自治の精神と高き知性。120余年の歴史と伝統を受け継ぐ長野の県立中高一貫校",
    recommend_phrase: "★ 伝統ある自主的な校風の中で、幅広い教養と探究心を高めたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "長野県",
    district: "諏訪市清水",
    station_name: "上諏訪駅",
    access_info: {
      primary_line: "JR中央本線",
      hub_station: "上諏訪駅・茅野駅・岡谷駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR上諏訪駅より徒歩約15分（または市内路線バス約5分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 30,
    tuition: 190000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "both"],
    vibe_label: "自治自立・伝統進学",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 93,
    recent_passed_records: "東大・京大・東北大・信州大医学部をはじめとする難関国公立大へ多数合格",
    events: [
      { id: "ev_seiryo_setsumei", title: "附属中学校説明会＆見学会", date: "10月4日(土)", type: "学校説明会", desc: "諏訪湖を望む伝統あるキャンパスと探究的な学習の様子を紹介します。" }
    ],
    special_classes: [
      { title: "清陵探究イノベーション", desc: "信州の大自然や諏訪の精密機械産業と連携した本格的な探究プロジェクト！" }
    ],
    school_strengths: ["長野県内公立中高一貫校トップクラスの大学進学実績！", "生徒自治を重んじる自由闊達でエネルギッシュな校風！"],
    life_simulation: "上諏訪駅から諏訪湖の風を感じながら登校。放課後は生徒会活動や伝統の部活動で思いきり青春を謳歌します。",
    parent_summary: "【進学・教育】長野県を代表する公立中高一貫校。高い進学実績と自由自立の教育方針が共存。【費用】公立校。",
    child_summary: "自由で元気いっぱいな先輩がたくさん！自分たちの力でいろんなイベントを作っていくワクワクする学校だよ！",
    tags: ["interest_reading_history", "interest_science_space", "interest_sports_athletics"],
    interest_category_label: "長野名門・公立一貫・自治伝統",
    is_favorite: false
  },

  // ==================== 東海追加 ====================
  {
    school_id: "sch_uguisudani",
    name: "鶯谷中学校",
    name_ruby: "うぐいすだにちゅうがっこう",
    official_url: "https://uguisudani.ed.jp/",
    catchphrase: "自調自律。駅近の快適な学習環境で難関国公立大学現役合格をめざす",
    recommend_phrase: "★ 駅から徒歩圏内の安心通学と、一人ひとりに寄り添ったきめ細かい指導を重視したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "岐阜県",
    district: "岐阜市竜田町",
    station_name: "岐阜駅",
    access_info: {
      primary_line: "JR東海道本線・高山本線・名鉄名古屋本線",
      hub_station: "岐阜駅・名鉄岐阜駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR岐阜駅・名鉄岐阜駅より徒歩約8分（駅近・通学安心）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "英進コース（中高一貫）",
    commute_time: 20,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "駅近・手厚い指導",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "東大・名大・岐阜大学医学部など難関国公立大学へ多数合格",
    events: [
      { id: "ev_uguisu_open", title: "オープンスクール＆入試体験", date: "9月20日(土)", type: "体験授業", desc: "駅近キャンパスの見学と最新ICTを活用した体験授業を実施します。" }
    ],
    special_classes: [
      { title: "放課後個別ステップ演習", desc: "自習室と直結した個別添削指導で苦手科目を完全克服！" }
    ],
    school_strengths: ["JR岐阜駅・名鉄岐阜駅から徒歩8分の抜群の交通アクセス！", "少人数制ならではの丁寧で手厚い進路指導！"],
    life_simulation: "岐阜駅から駅前通りを通って徒歩8分で登校。雨の日も楽々通学でき、放課後は自習室で質問学習に集中できます。",
    parent_summary: "【進学・教育】岐阜県トップ私立共学校。名古屋大学や医学部など国公立大進学に実績。【通学】岐阜駅徒歩8分の安心立地。",
    child_summary: "駅から歩いてすぐだから通いやすい！先生がとっても親身で、勉強の分からないところをすぐ教えてくれるよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_puzzle_math"],
    interest_category_label: "岐阜名門・駅近・手厚い指導",
    is_favorite: false
  },
  {
    school_id: "sch_shizuoka_seiko",
    name: "静岡聖光学院中学校",
    name_ruby: "しずおかせいこうがくいんちゅうがっこう",
    official_url: "https://www.s-seiko.ed.jp/",
    catchphrase: "世界を舞台に活躍するリーダーへ。豊かな自然と最先端ICTが融合する男子進学校",
    recommend_phrase: "★ 豊かな自然に抱かれた広大なキャンパスで、勉強もラグビー等の部活動も思いきりやり抜きたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "静岡県",
    district: "静岡市駿河区小鹿",
    station_name: "東静岡駅",
    access_info: {
      primary_line: "JR東海道本線・東海道新幹線",
      hub_station: "静岡駅・東静岡駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR東静岡駅南口および静岡駅より学校直通専用スクールバス運行（約10分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 25,
    tuition: 820000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["both", "global"],
    vibe_label: "文武両道・キリスト教愛徳",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 57,
    match_rate_child: 91,
    recent_passed_records: "東大・名大・東北大・慶應・早稲田など難関大へ高い現役進学率",
    events: [
      { id: "ev_s_seiko_fes", title: "聖光祭（文化祭）", date: "10月4日(土)・5日(日)", type: "文化祭", desc: "男子校ならではの迫力あるステージ企画や科学実験、展示が満載！" }
    ],
    special_classes: [
      { title: "アウトドア・リーダーシッププログラム", desc: "自然の中でのチームビルディングや問題解決型ワークショップ！" }
    ],
    school_strengths: ["全国大会常連のラグビー部をはじめとする文武両道の伝統！", "キリスト教精神に基づく手厚い人間教育と国際教育！"],
    life_simulation: "東静岡駅から専用スクールバスで緑あふれる小鹿キャンパスへ。放課後はグラウンドや実験室で仲間と熱中します。",
    parent_summary: "【進学・教育】静岡県屈指のカトリック男子進学校。男子の成長特性に応じたメリハリある指導で難関大進学。【通学】東静岡駅からスクールバス運行。",
    child_summary: "男子校だから気兼ねなく何でも本音で話せる最高の仲間ができる！スポーツもゲームも勉強も全力投球できる学校だよ！",
    tags: ["interest_sports_athletics", "interest_science_space", "interest_social_events"],
    interest_category_label: "静岡名門・男子校・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_takada_mie",
    name: "高田中学校",
    name_ruby: "たかだちゅうがっこう",
    official_url: "https://www.mie-takada-hj.ed.jp/",
    catchphrase: "真宗高田派の仏教精神。三重県随一の進学実績を誇る伝統の名門中高一貫校",
    recommend_phrase: "★ 伝統ある落ち着いた環境で、高い志を持つ仲間とともに東大や医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "三重県",
    district: "津市一身田町",
    station_name: "一身田駅",
    access_info: {
      primary_line: "JR紀勢本線・近鉄名古屋線",
      hub_station: "津駅・高田本山駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR一身田駅より徒歩5分、近鉄高田本山駅より徒歩20分（自転車可）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "6年制編入コース",
    commute_time: 25,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["manners", "stem"],
    vibe_label: "三重最高峰・仏教情操",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 63,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・名大・三重大学医学部など医学部・最難関大合格実績県内圧倒的No.1",
    events: [
      { id: "ev_takada_open", title: "高田中オープンスクール", date: "9月27日(土)", type: "学校説明会", desc: "国宝専修寺に隣接する歴史あるキャンパスとハイレベルな授業を公開。" }
    ],
    special_classes: [
      { title: "仏教情操と先端サイエンスゼミ", desc: "豊かな命の尊さを学びながら、高度な理数・医学探究を行う特別授業！" }
    ],
    school_strengths: ["三重県内で圧倒的な医学部・東大・京大現役合格者数！", "一身田駅徒歩5分の通いやすい立地！"],
    life_simulation: "一身田駅から徒歩5分で歴史ある校門へ。厳かな仏教行事と最先端の受験指導が調和した環境で学びます。",
    parent_summary: "【進学・教育】三重県トップの学力を誇る名門校。国公立大医学部合格実績は全国的にも高水準。【通学】JR一身田駅徒歩5分。",
    child_summary: "三重県でいちばん勉強ができるすごい学校！みんな目標に向かって一生懸命で、互いに尊敬し合える仲間ができるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_reading_history"],
    interest_category_label: "三重最高峰・医学部・仏教",
    is_favorite: false
  },

  // ==================== 近畿追加 ====================
  {
    school_id: "sch_omi_brother",
    name: "近江兄弟社中学校",
    name_ruby: "おうみきょうだいしゃちゅうがっこう",
    official_url: "https://www.vories.ac.jp/jh/",
    catchphrase: "ヴォーリズの精神息づく近江八幡。愛と奉仕の心でグローバルに生きる人を育む",
    recommend_phrase: "★ 美しい洋風建築と英語教育の中で、のびのびと個性を伸ばしたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "滋賀県",
    district: "近江八幡市市井町",
    station_name: "近江八幡駅",
    access_info: {
      primary_line: "JR琵琶湖線・近江鉄道",
      hub_station: "近江八幡駅・草津駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: true,
      school_bus_note: "JR近江八幡駅北口より直通スクールバス運行（約8分）、自転車通学可"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫グローバルコース",
    commute_time: 25,
    tuition: 720000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["global", "free"],
    vibe_label: "キリスト教愛徳・国際英語",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 54,
    match_rate_child: 89,
    recent_passed_records: "京都大・大阪大・同志社・立命館・海外大学など多数進学",
    events: [
      { id: "ev_vories_open", title: "ヴォーリズ・キャンパスフェスタ", date: "10月11日(土)", type: "文化祭", desc: "異国情緒ある登録有形文化財の校舎見学と英語スピーチ発表会！" }
    ],
    special_classes: [
      { title: "ヴォーリズ平和・国際探究", desc: "国際NGOや海外姉妹校とオンラインで結び、貧困や環境問題を議論する授業！" }
    ],
    school_strengths: ["メンター・ヴォーリズの精神に基づく心温まる人間教育！", "ネイティブ教員常駐による自然な英語習得環境！"],
    life_simulation: "近江八幡駅からスクールバスや自転車で登校。赤レンガと緑の美しいキャンパスでパイプオルガンの音色とともに1日が始まります。",
    parent_summary: "【進学・教育】キリスト教精神に基づく温かな校風。手厚い英語教育と関関同立・国公立大進学実績。【通学】近江八幡駅バス運行。",
    child_summary: "絵本に出てくるようなおしゃれな校舎が自慢！英語劇やボランティアなど、優しい心と広い視野が身につくよ！",
    tags: ["interest_arts_music", "interest_social_events", "interest_digital_tech"],
    interest_category_label: "滋賀名門・キリスト教・国際",
    is_favorite: false
  },
  {
    school_id: "sch_chiben_wakayama",
    name: "智辯学園和歌山中学校",
    name_ruby: "ちべんがくえんわかやまちゅうがっこう",
    official_url: "https://www.chiben.ac.jp/wakayama/",
    catchphrase: "愛のある徹底指導。東大・京大・国公立大医学部へ全国トップクラスの進学実績",
    recommend_phrase: "★ 難関大学や医学部合格に向けて、徹底的に学習に打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "和歌山県",
    district: "和歌山市冬野",
    station_name: "紀三井寺駅",
    access_info: {
      primary_line: "JR紀勢本線（きのくに線）",
      hub_station: "和歌山駅・泉佐野駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR和歌山駅・南海和歌山市駅・大阪泉州方面より専用スクールバス運行（多数便）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫選抜コース",
    commute_time: 30,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "和歌山最高峰・徹底医進",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 96,
    recent_passed_records: "東大・京大・国公立大学医学部現役合格率全国屈指の実績",
    events: [
      { id: "ev_chiben_setsumei", title: "入試説明会＆校内見学", date: "10月18日(土)", type: "学校説明会", desc: "驚異的な大学合格実績を生み出す学習指導法と学校生活を紹介します。" }
    ],
    special_classes: [
      { title: "東大・京大・国公立医特進ゼミ", desc: "ハイレベルな演習問題を通じて論理的思考力を極限まで高める特講！" }
    ],
    school_strengths: ["全国屈指の難関大・医学部合格実績を誇る名門校！", "和歌山県内・大阪南部からの充実した直通スクールバス！"],
    life_simulation: "自宅近くの発着所から直通スクールバスで登校。放課後は自習室で仲間とハイレベルな問題に挑戦します。",
    parent_summary: "【進学・教育】和歌山県のみならず近畿を代表する超進学校。東大・京大・国公立医へ抜群の実績。【通学】大阪・和歌山広域スクールバス運行。",
    child_summary: "全国でも有名なトップクラスの進学校！勉強も甲子園を応援する野球部もみんなで一丸になって燃える学校だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_sports_athletics"],
    interest_category_label: "和歌山最高峰・全国区医進・名門",
    is_favorite: false
  },

  // ==================== 中国・四国追加 ====================
  {
    school_id: "sch_yurihama",
    name: "湯梨浜学園中学校",
    name_ruby: "ゆりはまがくえんちゅうがっこう",
    official_url: "https://www.yurihamagakuen.ac.jp/",
    catchphrase: "東郷湖畔の豊かな自然。少人数徹底指導で難関大学現役合格を育む中高一貫校",
    recommend_phrase: "★ 美しい湖のほとりで、少人数のきめ細やかな個別指導を受けながら学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "鳥取県",
    district: "東伯郡湯梨浜町田後",
    station_name: "倉吉駅",
    access_info: {
      primary_line: "JR山陰本線",
      hub_station: "鳥取駅・倉吉駅・米子駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "鳥取駅・倉吉駅・米子駅方面より専用スクールバス運行（全寮制完備）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "free"],
    vibe_label: "少人数個別・全寮制併設",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 55,
    match_rate_child: 89,
    recent_passed_records: "鳥取大学医学部・難関国公立大学へ手厚い指導で多数合格",
    events: [
      { id: "ev_yurihama_open", title: "オープンスクール＆湖畔見学", date: "10月25日(土)", type: "学校説明会", desc: "湖を望む静かな教室での体験授業と学生寮の見学会を実施します。" }
    ],
    special_classes: [
      { title: "湖畔の環境サイエンスワークショップ", desc: "東郷湖の自然環境や水生生物を調査・分析する少人数フィールドワーク！" }
    ],
    school_strengths: ["1クラス20名前後の徹底した少人数・個別指導体制！", "鳥取・倉吉・米子をカバーするスクールバス運行！"],
    life_simulation: "スクールバスで東郷湖を望む校舎へ登校。放課後は先生が個別ブースで付きっきりで勉強の質問に答えてくれます。",
    parent_summary: "【進学・教育】鳥取県中部の私立中高一貫校。少人数指導による鳥取大医学部・国公立大進学実績。【通学】県内各方面スクールバス有。",
    child_summary: "湖が見えるすごく綺麗なキャンパス！生徒数が少なくて先生との距離が近いから、どんなことでも相談できるよ！",
    tags: ["interest_nature_biology", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "鳥取・少人数個別・自然探究",
    is_favorite: false
  },
  {
    school_id: "sch_kaisei_shimane",
    name: "開星中学校",
    name_ruby: "かいせいちゅうがっこう",
    official_url: "https://www.kaisei.matsue.shimane.jp/",
    catchphrase: "夢現（ゆめをかたちに）。手厚いICT教育と文武両道で島根から世界へ",
    recommend_phrase: "★ 一人一台端末を活用した先進的な探究授業と、活気あふれる部活動を両立したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "島根県",
    district: "松江市西持田町",
    station_name: "松江駅",
    access_info: {
      primary_line: "JR山陰本線",
      hub_station: "松江駅",
      walk_minutes: 0,
      bus_minutes: 12,
      school_bus: true,
      school_bus_note: "JR松江駅および出雲・米子方面より直通スクールバス運行（約12分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 25,
    tuition: 660000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "stem"],
    vibe_label: "文武両道・ICT先進",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 54,
    match_rate_child: 88,
    recent_passed_records: "島根大学医学部・難関国公立大学・関関同立等多数進学",
    events: [
      { id: "ev_kaisei_open", title: "開星中オープンスクール", date: "9月20日(土)", type: "体験授業", desc: "iPadを活用したプログラミング授業やドローン体験、部活動体験！" }
    ],
    special_classes: [
      { title: "ICTフロンティア探究", desc: "プログラミングや動画制作を活用した課題解決型プレゼンテーション！" }
    ],
    school_strengths: ["文科省認定の先進的ICT教育とプログラミング指導！", "野球部や柔道部など全国大会出場の強豪部活動！"],
    life_simulation: "松江駅からスクールバスで登校。教室ではタブレットを使ってインタラクティブに学び、放課後は部活に打ち込みます。",
    parent_summary: "【進学・教育】島根県松江市の私立中高一貫校。ICT探究と島根大をはじめとする国公立大進学実績。【通学】スクールバス完備。",
    child_summary: "タブレットを使った面白い授業がいっぱい！スポーツも盛んで、毎日ワクワクしながら学校に通えるよ！",
    tags: ["interest_digital_tech", "interest_sports_athletics", "interest_social_events"],
    interest_category_label: "島根名門・ICT探究・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_okayama_hakuryo",
    name: "岡山白陵中学校",
    name_ruby: "おかやまはくりょうちゅうがっこう",
    official_url: "https://www.okahaku.ed.jp/",
    catchphrase: "教養と愛真。高い知性と強靭な精神を鍛え上げる岡山最高峰の進学校",
    recommend_phrase: "★ 東大・京大や国公立大医学部を目指し、ハイレベルな授業と寮生活で実力を伸ばしたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "岡山県",
    district: "赤磐市門前",
    station_name: "熊山駅",
    access_info: {
      primary_line: "JR山陽本線",
      hub_station: "岡山駅・相生駅",
      walk_minutes: 0,
      bus_minutes: 5,
      school_bus: true,
      school_bus_note: "JR熊山駅よりスクールバス直通約5分（または徒歩約20分、全寮制完備）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 30,
    tuition: 850000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "岡山最高峰・徹底医進",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 96,
    recent_passed_records: "東大・京大・岡山大学医学部をはじめ全国の医学部へ毎年抜群の合格者数",
    events: [
      { id: "ev_okahaku_open", title: "入試説明会＆寮見学会", date: "10月25日(土)", type: "学校説明会", desc: "全国区の進学実績を支える緻密な学習計画と快適な学生寮を公開。" }
    ],
    special_classes: [
      { title: "白陵スーパーアカデミック演習", desc: "高度な論述問題に立ち向かう深い思考力と記述力を養う演習！" }
    ],
    school_strengths: ["岡山県トップの東大・京大・国公立大医学部合格実績！", "自学自習の習慣が確実に身につく伝統の教育システムと寮設備！"],
    life_simulation: "岡山駅から山陽本線で熊山駅へ向かい、スクールバスで登校。放課後は自習室で仲間とハイレベルな課題を解き進めます。",
    parent_summary: "【進学・教育】岡山県屈指の超進学校。医学部・難関国立大への圧倒的な強さを誇る。【通学・生活】熊山駅バス運行、遠隔地生向けの寮完備。",
    child_summary: "全国から医学部や東大を目指すトップクラスの仲間が集まる学校！先生方の授業がハイレベルで知的好奇心が刺激されるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "岡山最高峰・全国区医進・名門",
    is_favorite: false
  },
  {
    school_id: "sch_keishin_yamaguchi",
    name: "慶進中学校",
    name_ruby: "けいしんちゅうがっこう",
    official_url: "https://www.keishin.ed.jp/",
    catchphrase: "自ら学び、自ら考え、自ら創る。山口県屈指の進路実績を誇る中高一貫校",
    recommend_phrase: "★ 先生方のきめ細やかなサポートのもと、難関大学や山口大学医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "山口県",
    district: "宇部市東琴芝",
    station_name: "宇部新川駅",
    access_info: {
      primary_line: "JR宇部線",
      hub_station: "新山口駅・宇部駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: true,
      school_bus_note: "琴芝駅より徒歩5分、宇部新川駅・新山口駅・小野田方面よりスクールバス運行"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫アドバンスコース",
    commute_time: 25,
    tuition: 690000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い指導・医進選抜",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "山口大学医学部・東大・九大・国公立大学へ多数現役合格",
    events: [
      { id: "ev_keishin_open", title: "オープンスクール＆理科実験", date: "9月27日(土)", type: "体験授業", desc: "最新の理科実験棟での楽しい体験授業と学校生活説明会を実施！" }
    ],
    special_classes: [
      { title: "アドバンス・メディカルゼミ", desc: "医学部・医療系志望者に向けた小論文対策や医療現場ディスカッション！" }
    ],
    school_strengths: ["山口大学医学部をはじめとする医療系・難関大への抜群の指導力！", "主要駅から学校直通の通学スクールバス運行！"],
    life_simulation: "新山口駅や宇部市内からスクールバスで登校。放課後は個別学習ブースで先生に質問しながら課題を解決します。",
    parent_summary: "【進学・教育】山口県有数の私立中高一貫校。山口大医学部をはじめ国公立大進学に強み。【通学】新山口駅などからスクールバス運行。",
    child_summary: "先生がすごく親身でアットホーム！実験設備が充実していて、理科や数学がどんどん得意になる学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "山口名門・医進・手厚い指導",
    is_favorite: false
  },
  {
    school_id: "sch_tokushima_bunri",
    name: "徳島文理中学校",
    name_ruby: "とくしまぶんりちゅうがっこう",
    official_url: "https://www.bunri.ed.jp/",
    catchphrase: "自立協同。徳島県内屈指の医学部・難関国公立大学進学実績を誇る名門私立",
    recommend_phrase: "★ 徳島大学医学部や難関大学進学を目指し、高い学力と教養を培いたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "徳島県",
    district: "徳島市山城町",
    station_name: "徳島駅",
    access_info: {
      primary_line: "JR高徳線・牟岐線・徳島線",
      hub_station: "徳島駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: true,
      school_bus_note: "JR徳島駅より路線バス・スクールバス約10分、阿波富田駅より徒歩約15分"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科中高一貫",
    commute_time: 25,
    tuition: 740000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "support"],
    vibe_label: "徳島最高峰・医学部実績",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "徳島大学医学部をはじめとする国公立大医学部・東大・京大へ圧倒的な合格者数",
    events: [
      { id: "ev_bunri_setsumei", title: "入試説明会＆体験授業", date: "10月11日(土)", type: "体験授業", desc: "文理中ならではの高度で楽しい数学・英語の体験授業を実施！" }
    ],
    special_classes: [
      { title: "サイエンス・メディカル研究会", desc: "大学教授の指導のもとで遺伝子や物理現象を探究するハイレベルゼミ！" }
    ],
    school_strengths: ["徳島県内で圧倒的な国公立大医学部合格実績！", "文理大学キャンパス隣接の充実した研究・学習環境！"],
    life_simulation: "徳島駅からバスや自転車で登校。緑あふれる文理大学隣接キャンパスで高い志を持つ仲間と机を並べます。",
    parent_summary: "【進学・教育】徳島県内私立トップの進学校。徳島大医学部など医学系進学実績は全国レベル。【通学】徳島駅より直通バス運行。",
    child_summary: "徳島でお医者さんになりたい子がみんな憧れる学校！勉強熱心な友達がいっぱいで、自然とやる気が出るよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "徳島最高峰・医学部・進学校",
    is_favorite: false
  },
  {
    school_id: "sch_otemae_marugame",
    name: "大手前丸亀中学校",
    name_ruby: "おおてまえまるがめちゅうがっこう",
    official_url: "https://www.otemae.ed.jp/",
    catchphrase: "自ら学び、自ら問い、自ら未来を創る。香川県屈指の進学校",
    recommend_phrase: "★ 駅から徒歩すぐの安心通学で、一人ひとりを伸ばす手厚い進学指導を受けたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "香川県",
    district: "丸亀市大手町",
    station_name: "丸亀駅",
    access_info: {
      primary_line: "JR予讃線",
      hub_station: "丸亀駅・坂出駅・高松駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR丸亀駅南口より徒歩約10分（丸亀城の美しいお堀のそば）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫コース",
    commute_time: 20,
    tuition: 710000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い指導・医進難関",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "東大・京大・香川大学医学部・難関国立大学へ多数合格",
    events: [
      { id: "ev_otemae_open", title: "オープンスクール＆入試プレテスト", date: "10月18日(土)", type: "体験授業", desc: "丸亀城を望む落ち着いた校舎での体験授業と入試ワンポイントアドバイス！" }
    ],
    special_classes: [
      { title: "探究型アクティブラーニングゼミ", desc: "丸亀の地域課題や先端サイエンスをテーマにした協働プレゼンテーション！" }
    ],
    school_strengths: ["JR丸亀駅から徒歩10分の通いやすい安心の立地！", "香川大学医学部をはじめとする難関大への高い現役進学率！"],
    life_simulation: "丸亀駅から丸亀城のお堀端を通って爽快に登校。放課後は完全個別化された自習ブースで集中学習に取り組みます。",
    parent_summary: "【進学・教育】香川県有数の伝統私立進学校。医学部・難関国公立大進学に実績。【通学】JR丸亀駅徒歩10分の好立地。",
    child_summary: "丸亀城のすぐ隣にあって景色がすごくいい！先生が一人ひとりの質問に最後まで付き合ってくれる温かい学校だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_reading_history"],
    interest_category_label: "香川名門・駅近・医学部",
    is_favorite: false
  },
  {
    school_id: "sch_tosa_kochi",
    name: "土佐中学校",
    name_ruby: "とさちゅうがっこう",
    official_url: "https://www.tosa.ed.jp/",
    catchphrase: "報恩感謝。高知県トップの進学実績を誇る自由闊達で質実剛健な名門中高一貫校",
    recommend_phrase: "★ 高知県で最も高い進学力を持ち、全国から集まる仲間と部活動も勉強も思いきりやり抜きたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "高知県",
    district: "高知市塩屋崎町",
    station_name: "旭駅",
    access_info: {
      primary_line: "とさでん交通・JR土讃線",
      hub_station: "高知駅・はりまや橋",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "はりまや橋・高知駅より土佐電鉄バス「土佐高校前」直通下車すぐ、自転車通学多数"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科中高一貫",
    commute_time: 25,
    tuition: 680000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["free", "both"],
    vibe_label: "高知最高峰・質実剛健",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "東大・京大・高知大学医学部をはじめとする全国の医学部へ圧倒的な合格実績",
    events: [
      { id: "ev_tosa_bunkasai", title: "土佐中高文化祭", date: "9月20日(土)・21日(日)", type: "文化祭", desc: "生徒主体のエネルギッシュな模擬店や研究発表、音楽会が開催されます。" }
    ],
    special_classes: [
      { title: "報恩感謝キャリア探究講座", desc: "政財界や医療の第一線で活躍する卒業生による白熱のキャリア講義！" }
    ],
    school_strengths: ["高知県内で他の追随を許さない圧倒的な難関大学・医学部進学実績！", "伝統の「報恩感謝」の精神に基づく熱い友情と結束力！"],
    life_simulation: "高知市内各方面から自転車や路面電車・バスで登校。放課後は伝統の部活動や図書室での自習に情熱を注ぎます。",
    parent_summary: "【進学・教育】高知県No.1の歴史と実績を誇る名門校。東大・医学部合格実績は四国屈指。【校風】自主自立と文武両道。",
    child_summary: "高知でいちばん憧れられているかっこいい学校！みんな明るくて元気いっぱいで、一生モノの親友ができるよ！",
    tags: ["interest_sports_athletics", "interest_science_space", "interest_social_events"],
    interest_category_label: "高知最高峰・文武両道・医進名門",
    is_favorite: false
  },

  // ==================== 九州追加 ====================
  {
    school_id: "sch_waseda_saga",
    name: "早稲田佐賀中学校",
    name_ruby: "わせださがちゅうがっこう",
    official_url: "https://www.wasedasaga.jp/",
    catchphrase: "唐津城を望む学び舎から早稲田へ、そして世界へ。早稲田大学系属校",
    recommend_phrase: "★ 早稲田大学への進学推薦枠（約50％）を持ちながら、東大・医学部にも挑戦したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "佐賀県",
    district: "唐津市東城内",
    station_name: "唐津駅",
    access_info: {
      primary_line: "JR筑肥線（地下鉄空港線直通）・JR唐津線",
      hub_station: "福岡空港・博多駅・天神駅・佐賀駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: true,
      school_bus_note: "福岡市（博多・天神）から直通電車約1時間、佐賀駅方面からスクールバス運行（全寮制完備）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科中高一貫（通学・寮制）",
    commute_time: 35,
    tuition: 920000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["free", "global"],
    vibe_label: "早稲田系属・進取の精神",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "早稲田大学各学部へ約50％進学＋東大・京大・国公立医学部多数合格",
    events: [
      { id: "ev_waseda_open", title: "早稲田佐賀オープンキャンパス＆寮見学", date: "10月11日(土)", type: "学校説明会", desc: "唐津城に隣接する歴史的景観のキャンパスと最新の学生寮八太郎館を見学！" }
    ],
    special_classes: [
      { title: "早稲田大学連携グローバル講義", desc: "早稲田大学の専任教授陣による最先端の学術ゼミや出張講義！" }
    ],
    school_strengths: ["早稲田大学への高い推薦進学率と九州・全国からの多彩な生徒層！", "唐津城の麓、海と歴史に囲まれた絶好の教育環境と安心の寮！"],
    life_simulation: "福岡（博多・天神）から電車直通または唐津の寮から登校。唐津城の美しい景色を望みながら高い志で学びます。",
    parent_summary: "【進学・教育】早稲田大学系属校。早稲田大推薦枠を保持しつつ国公立大・医学部も受験可能。【環境】通学制と全寮制を併設。",
    child_summary: "唐津城のすぐそばにある憧れの早稲田！早稲田大学に行けるチャンスがあって、全国から面白い仲間が集まってくるよ！",
    tags: ["interest_reading_history", "interest_social_events", "interest_digital_tech"],
    interest_category_label: "早稲田系属・九州・大学附属",
    is_favorite: false
  },
  {
    school_id: "sch_seiun_nagasaki",
    name: "青雲中学校",
    name_ruby: "せいうんちゅうがっこう",
    official_url: "https://www.seiun-jh.ed.jp/",
    catchphrase: "青雲の志を胸に。九州・全国から集う仲間と医学部・東大を目指す名門進学校",
    recommend_phrase: "★ 伝統の徹底した学習指導と規則正しい寮生活で、医師や先端研究者を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "長崎県",
    district: "西彼杵郡時津町左底郷",
    station_name: "長崎駅",
    access_info: {
      primary_line: "西九州新幹線・JR長崎本線",
      hub_station: "長崎駅・浦上駅・諫早駅",
      walk_minutes: 0,
      bus_minutes: 30,
      school_bus: true,
      school_bus_note: "JR長崎駅・浦上駅・諫早駅より学校直通専用スクールバス運行（全寮制完備）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 35,
    tuition: 820000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "長崎最高峰・医学部実績",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "東大・京大・長崎大学医学部をはじめ全国の医学部へ毎年屈指の合格実績",
    events: [
      { id: "ev_seiun_open", title: "入試説明会＆青雲寮見学会", date: "10月25日(土)", type: "学校説明会", desc: "徹底した学習指導のノウハウと全国から集まる仲間が暮らす寮を公開。" }
    ],
    special_classes: [
      { title: "青雲医進ゼミナール", desc: "長崎大学医学部教授やOB医師を招いたメディカルワークショップ！" }
    ],
    school_strengths: ["全国に轟く圧倒的な国公立大学医学部合格実績！", "自学自習を確立する専任教員常駐の学習寮完備！"],
    life_simulation: "長崎駅などからスクールバスで大村湾を望む時津キャンパスへ。放課後は自習室で仲間とハイレベルな問題に挑みます。",
    parent_summary: "【進学・教育】長崎県No.1の進学校。医学部合格実績は全国屈指。【通学・生活】長崎駅から直通スクールバス運行、全寮制完備。",
    child_summary: "お医者さんや学者を目指す熱い仲間がいっぱい！先生たちも全力で応援してくれて、ぐんぐん実力がつく学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_digital_tech"],
    interest_category_label: "長崎最高峰・全国区医進・名門",
    is_favorite: false
  },
  {
    school_id: "sch_marist_kumamoto",
    name: "熊本マリスト学園中学校",
    name_ruby: "くまもとまりすとがくえんちゅうがっこう",
    official_url: "https://www.marist.ed.jp/",
    catchphrase: "信・望・愛。国際性と確かな学力を育むカトリックミッションスクール",
    recommend_phrase: "★ 温かな人間教育と手厚い個別指導のもと、熊本大学医学部や難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "熊本県",
    district: "熊本市東区健軍",
    station_name: "健軍町電停",
    access_info: {
      primary_line: "熊本市電・JR豊肥本線",
      hub_station: "熊本駅・水前寺駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: true,
      school_bus_note: "市電「健軍町」より徒歩8分、熊本駅・光の森・松橋方面よりスクールバス運行"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫普通科",
    commute_time: 25,
    tuition: 710000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["manners", "support"],
    vibe_label: "カトリック愛徳・手厚い進学",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "熊本大学医学部・難関国公立大学・早慶上智・カトリック系大学多数進学",
    events: [
      { id: "ev_marist_open", title: "マリスト祭（バザー・文化祭）", date: "10月4日(土)", type: "文化祭", desc: "国際色豊かな展示やチャリティバザー、生徒による研究発表会！" }
    ],
    special_classes: [
      { title: "グローバル・マリスト・イングリッシュ", desc: "ネイティブ教員による少人数イマージョン英語ワークショップ！" }
    ],
    school_strengths: ["世界80カ国に広がるマリスト修道会ネットワーク！", "熊本市内および近郊を幅広く結ぶ安心のスクールバス運行！"],
    life_simulation: "熊本市内から市電やスクールバスで登校。静かな祈りから1日が始まり、放課後は自習スペースで丁寧に質問学習を行います。",
    parent_summary: "【進学・教育】カトリック精神に基づく品格と高い知性を育む名門校。熊本大医学部や国公立大進学実績。【通学】市電徒歩8分、バス有。",
    child_summary: "先生も先輩もすごく優しくてアットホーム！英語が楽しく身について、海外の文化にもたくさん触れられるよ！",
    tags: ["interest_arts_music", "interest_social_events", "interest_science_space"],
    interest_category_label: "熊本名門・カトリック・国際",
    is_favorite: false
  },
  {
    school_id: "sch_iwata_oita",
    name: "岩田中学校",
    name_ruby: "いわたちゅうがっこう",
    official_url: "https://www.iwata.ed.jp/",
    catchphrase: "自ら考え行動する自立の精神。大分県随一の進学指導とAPU立命館連携",
    recommend_phrase: "★ 難関大学や医学部を目指す「医学進学コース」や立命館アジア太平洋大学（APU）連携に興味がある人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "大分県",
    district: "大分市岩田町",
    station_name: "大分駅",
    access_info: {
      primary_line: "JR日豊本線・久大本線・豊肥本線",
      hub_station: "大分駅・牧駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: true,
      school_bus_note: "JR大分駅府内中央口および別府・わさだ方面より専用スクールバス運行（牧駅徒歩12分）"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "医科・難関大コース／APU・IBコース",
    commute_time: 25,
    tuition: 730000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "global"],
    vibe_label: "医進特化・APU国際連携",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 92,
    recent_passed_records: "東大・京大・大分大学医学部など医学部・難関国立大へ多数合格",
    events: [
      { id: "ev_iwata_open", title: "岩田中オープンキャンパス", date: "9月27日(土)", type: "体験授業", desc: "医学進学ゼミの体験授業やAPU留学生との英語アクティビティ！" }
    ],
    special_classes: [
      { title: "メディカルサイエンス特講", desc: "大分大学医学部と連携した解剖学や先端医療技術に関する特別講義！" }
    ],
    school_strengths: ["大分県内で圧倒的な医学部現役進学実績を誇る伝統！", "大分駅・別府方面からの通学用スクールバス完備！"],
    life_simulation: "大分駅からスクールバスで岩田キャンパスへ。放課後は自習館でチューターや教員の手厚い個別指導を受けます。",
    parent_summary: "【進学・教育】大分県内トップの私立進学校。医学部特化クラスとAPU連携国際クラスを設置。【通学】大分駅等からスクールバス運行。",
    child_summary: "お医者さんを目指す仲間がたくさんいて刺激になる！世界中から集まるお兄さんお姉さんと英語で話せるのも楽しいよ！",
    tags: ["interest_science_space", "interest_digital_tech", "interest_puzzle_math"],
    interest_category_label: "大分最高峰・医学部・国際連携",
    is_favorite: false
  },
  {
    school_id: "sch_miyazaki_daiichi",
    name: "宮崎第一中学校",
    name_ruby: "みやざきだいいちちゅうがっこう",
    official_url: "https://miyaichi.ed.jp/",
    catchphrase: "高い志と豊かな人間性。一人ひとりの夢を現実に変える宮崎屈指の進学校",
    recommend_phrase: "★ 先生方の手厚い個別補習と熱心な進路指導で、宮崎大学医学部や難関大学を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "宮崎県",
    district: "宮崎市郡司分",
    station_name: "南宮崎駅",
    access_info: {
      primary_line: "JR日豊本線・日南線・宮崎空港線",
      hub_station: "宮崎駅・南宮崎駅",
      walk_minutes: 0,
      bus_minutes: 15,
      school_bus: true,
      school_bus_note: "宮崎駅・南宮崎駅・都城・日南・西都など宮崎県内各方面より広域スクールバス多数運行"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中高一貫特別選抜コース",
    commute_time: 30,
    tuition: 670000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["support", "stem"],
    vibe_label: "手厚い指導・医進選抜",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 90,
    recent_passed_records: "宮崎大学医学部をはじめとする国公立大医学部・九州大・難関大へ多数合格",
    events: [
      { id: "ev_m_daiichi_open", title: "オープンスクール＆理科実験室ツアー", date: "10月18日(土)", type: "体験授業", desc: "広大なキャンパスとICT授業体験、楽しいサイエンス実験教室を実施！" }
    ],
    special_classes: [
      { title: "ドクターズ・キャリアワークショップ", desc: "現役医師として活躍する卒業生によるメディカルガイダンスと小論文指導！" }
    ],
    school_strengths: ["宮崎県内全域をカバーする網羅的なスクールバス運行！", "夜間学習支援や個別質問対応など徹底した補習体制！"],
    life_simulation: "自宅近くの停留所からスクールバスで広大なキャンパスへ。放課後は自習室で質問しながら課題を確実に終わらせます。",
    parent_summary: "【進学・教育】宮崎県有数の私立中高一貫進学校。医学部・難関国立大進学に実績。【通学】県内広域スクールバス完備。",
    child_summary: "バスで家の近くまで迎えに来てくれるから安心！先生が本当に親身で、勉強の楽しさを教えてくれる学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_sports_athletics"],
    interest_category_label: "宮崎名門・医進・広域通学バス",
    is_favorite: false
  },
  // ==================== Z会公立中高一貫校 ＆ インターエデュ主要私立校 新規拡充データ ====================,
  {
    school_id: "sch_koishikawa",
    name: "東京都立小石川中等教育学校",
    name_ruby: "とうきょうとりつこいしかわちゅうとうきょういくがっこう",
    official_url: "https://www.metro.ed.jp/koishikawa-s/",
    catchphrase: "立志・開拓・創作の精神。小石川フィロソフィーで世界に羽ばたくリーダーを育成",
    recommend_phrase: "★ 科学的な探究や国際交流に情熱を燃やし、深い思考力と行動力を磨きたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "文京区本駒込",
    station_name: "巣鴨駅",
    access_info: {
      primary_line: "JR山手線・都営三田線",
      hub_station: "池袋駅・大手町駅",
      walk_minutes: 3,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "都営三田線「千石駅」徒歩3分、JR山手線「巣鴨駅」徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "中等教育課程（前期・後期6年一貫）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "理数探究・自由闊達",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 67,
    match_rate_child: 96,
    recent_passed_records: "東京大学・京都大学・国公立大学医学部等への現役合格多数",
    events: [
      {
            "id": "ev_koi_1",
            "title": "学校説明会・施設見学",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "探究授業の実演や6年一貫のカリキュラムについて詳しくご紹介します。"
      },
      {
            "id": "ev_koi_2",
            "title": "創作展（文化祭）",
            "date": "9月13日(土)",
            "type": "文化祭",
            "desc": "各学年の自由研究や部活動の成果を公開する伝統の創作展です。"
      }
],
    special_classes: [
      {
            "title": "小石川フィロソフィー",
            "desc": "自然科学・社会課題を自ら問い立て実験・検証し論文にまとめる独自プログラム！"
      }
],
    school_strengths: [
      "公立最高峰の理数・探究教育と圧倒的な国公立難関大合格実績！",
      "千石駅・巣鴨駅から至近の抜群のアクセスと安全な学習環境！",
      "授業料無償（公立一貫校）で私学トップレベルの高度な教育を展開！"
],
    life_simulation: "巣鴨・千石駅から徒歩数分で登校。午前はレベルの高い理数・語学の授業、午後は広大な実験室での課題研究に没頭し、放課後は部活動や自習室で仲間と語り合います。",
    parent_summary: "【教育方針・進学】都立中高一貫のフラッグシップ校。「小石川フィロソフィー」を通じた課題解決型学習と高い学力養成により、東大をはじめとする最難関国立大学に多数の合格者を輩出。【環境・費用】文京区の文教エリアに位置し、公立のため学費負担が極めて抑えられます。",
    child_summary: "実験設備がすごい！「なぜだろう？」と思った疑問をとことん研究して、自分だけの自由研究や大発見に挑戦できるワクワクする学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_nature_biology"],
    interest_category_label: "自然科学・高度探究",
    is_favorite: false
  },
  {
    school_id: "sch_oshukan",
    name: "東京都立桜修館中等教育学校",
    name_ruby: "とうきょうとりつおうしゅうかんちゅうとうきょういくがっこう",
    official_url: "https://www.metro.ed.jp/oshukan-s/",
    catchphrase: "「論理的思考力」を磨き、高い知性と豊かな情操を育む目黒の都立名門校",
    recommend_phrase: "★ 国語力やディベート、多面的なものの見方を深め、自分の意見をしっかり発信したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "目黒区八雲",
    station_name: "都立大学駅",
    access_info: {
      primary_line: "東急東横線",
      hub_station: "渋谷駅・横浜駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東急東横線「都立大学駅」より徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "arts"],
    vibe_label: "論理表現・自主自律",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "東京大学・東京工業大学・一橋大学など国公立難関大に安定した進学実績",
    events: [
      {
            "id": "ev_oshu_1",
            "title": "学校公開・授業見学",
            "date": "10月25日(土)",
            "type": "学校説明会",
            "desc": "独自の論理表現指導や生き生きとした生徒の様子を公開します。"
      },
      {
            "id": "ev_oshu_2",
            "title": "記念祭（文化祭）",
            "date": "9月20日(土)",
            "type": "文化祭",
            "desc": "生徒主体の企画展や舞台発表が盛り上がる桜修館最大のイベントです。"
      }
],
    special_classes: [
      {
            "title": "論理国語・探究ゼミ",
            "desc": "物事を多角的に検証し、自分の言葉で説得力ある小論文や発表に落とし込む独自授業！"
      }
],
    school_strengths: [
      "東横線沿線の緑豊かで落ち着いた住環境と学習に適したキャンパス！",
      "「国語力」をベースにした論理的思考力の徹底指導！",
      "文武両道を重んじ、運動部・文化部ともに生徒が主体的に活躍！"
],
    life_simulation: "都立大学駅から緑豊かな呑川緑道を歩いて登校。論理的なディスカッションが多い授業で思考を深め、放課後は部活動や図書館で仲間と切磋琢磨します。",
    parent_summary: "【教育方針・進学】府立高校の系譜を継ぐ都立中高一貫校。徹底した論理的思考・文章作成能力の育成に定評があり、東大をはじめ難関国公立大学への高い進学実績を誇ります。【環境・費用】目黒区八雲の閑静な住宅街に位置。公立のため学費負担が少なく充実した6年教育を受けられます。",
    child_summary: "自分の考えを文章に書いたり友達と話し合ったりするのが大好きな子にぴったり！図書室の本も豊富で、文化祭も部活もみんなで熱中できるよ！",
    tags: ["interest_history_culture", "interest_drawing_create", "interest_puzzle_math"],
    interest_category_label: "論理思考・人文表現",
    is_favorite: false
  },
  {
    school_id: "sch_ryogoku",
    name: "東京都立両国高等学校附属中学校",
    name_ruby: "とうきょうとりつりょうごくこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.metro.ed.jp/ryogoku-h/",
    catchphrase: "「自律自修」「愛と正義」。下町の伝統と先進探究が息づく都立の伝統進学校",
    recommend_phrase: "★ 深い歴史とリーダーシップを学び、仲間とともに高い志を持って挑戦したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "墨田区江東橋",
    station_name: "錦糸町駅",
    access_info: {
      primary_line: "JR総武線・東京メトロ半蔵門線",
      hub_station: "東京駅・錦糸町駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR総武線「錦糸町駅」南口・半蔵門線錦糸町駅より徒歩5分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "文武両道・質実剛健",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "東京大学・東京工業大学・東北大学等に多数の現役合格者",
    events: [
      {
            "id": "ev_ryo_1",
            "title": "学校説明会",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "両国独自のリーダー教育と進学指導方針を解説します。"
      }
],
    special_classes: [
      {
            "title": "両国フィールドワーク＆志学",
            "desc": "芥川龍之介の母校としての教養教育と、自ら課題を設定する探究学習！"
      }
],
    school_strengths: [
      "錦糸町駅から徒歩5分の圧倒的交通至便な立地！",
      "芥川龍之介をはじめ数多の英才を輩出した120年の歴史と伝統！",
      "手厚い進路指導と公立ならではの安心の教育環境！"
],
    life_simulation: "錦糸町駅から徒歩5分で登校。活気ある下町の風情と緑に囲まれた校舎で学び、放課後は運動部や文化部で先輩・後輩と協力しながら成長します。",
    parent_summary: "【教育方針・進学】名門旧制三中を前身とする都立中高一貫校。創立以来の「自律自修」の精神のもと、手厚い個別進路指導により東大・難関国立大への確かな合格実績を誇ります。【環境・費用】錦糸町駅徒歩5分で通学利便性抜群。公立校のため学費は授業料無償です。",
    child_summary: "駅のすぐ近くで通いやすい！有名な作家や科学者の先輩がたくさんいる伝統校で、勉強も運動会もみんなで全力で盛り上がるよ！",
    tags: ["interest_history_culture", "interest_sports_outdoor", "interest_puzzle_math"],
    interest_category_label: "歴史・教養・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_musashikou_jh",
    name: "東京都立武蔵高等学校附属中学校",
    name_ruby: "とうきょうとりつむさしこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.metro.ed.jp/musashi-h/",
    catchphrase: "「地球学」で世界を見つめる。武蔵野の緑豊かなキャンパスで探究心を育む名門校",
    recommend_phrase: "★ 地球規模の課題や自然環境に興味があり、じっくり深く研究したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "武蔵野市境",
    station_name: "武蔵境駅",
    access_info: {
      primary_line: "JR中央線・西武多摩川線",
      hub_station: "新宿駅・吉祥寺駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR中央線「武蔵境駅」北口より徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "地球科学・自然探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "東京大学・京都大学・一橋大学・東工大など難関国公立大へ多数合格",
    events: [
      {
            "id": "ev_mus_1",
            "title": "学校説明会・施設見学",
            "date": "10月4日(土)",
            "type": "学校説明会",
            "desc": "地球学の実践と緑あふれるキャンパス環境をご案内します。"
      }
],
    special_classes: [
      {
            "title": "独自探究プログラム「地球学」",
            "desc": "環境・宇宙・国際社会を多面的に調査・研究する都立武蔵の看板プログラム！"
      }
],
    school_strengths: [
      "中央線沿線の便利で安全な教育エリア！",
      "自然科学・環境問題に強い独自の「地球学」教育！",
      "難関国立大への抜群の現役進学率！"
],
    life_simulation: "武蔵境駅から木立を抜けて登校。豊かな自然が残る校舎で最先端の環境探究やディベートに取り組み、放課後は広大なグラウンドで部活に打ち込みます。",
    parent_summary: "【教育方針・進学】多摩地区を代表する都立中高一貫進学校。「地球学」に象徴される探究型教育と確かな基礎学力向上指導により、難関国公立大学への高い現役進学実績を築いています。【環境・費用】緑豊かな武蔵野エリア。公立のため授業料無償でハイレベルな教育が享受できます。",
    child_summary: "地球や宇宙、生き物の不思議を調べるのが好きな子に最高！学校のまわりも緑がいっぱいで、広々としたグラウンドで元気に過ごせるよ！",
    tags: ["interest_nature_biology", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "環境・地球科学・探究",
    is_favorite: false
  },
  {
    school_id: "sch_hakuo",
    name: "東京都立白鷗高等学校附属中学校",
    name_ruby: "とうきょうとりつはくおうこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.metro.ed.jp/hakuo-h/",
    catchphrase: "日本初の公立中高一貫校。伝統文化とグローバルリーダーシップの融合",
    recommend_phrase: "★ 日本の伝統文化（和太鼓・百人一首・茶道など）を愛し、世界と対話できる広い視野を持ちたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "台東区元浅草",
    station_name: "新御徒町駅",
    access_info: {
      primary_line: "つくばエクスプレス・都営大江戸線・銀座線",
      hub_station: "上野駅・秋葉原駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "新御徒町駅徒歩5分、稲荷町駅徒歩7分、浅草駅徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["arts", "academics"],
    vibe_label: "伝統文化・国際理解",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 92,
    recent_passed_records: "東京大学・東京外国語大学・早慶上理など難関大への確かな進学実績",
    events: [
      {
            "id": "ev_haku_1",
            "title": "学校説明会・体験講座",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "日本の伝統文化理解教育と6年一貫カリキュラムの特長を解説します。"
      }
],
    special_classes: [
      {
            "title": "日本の伝統文化体験・発信プログラム",
            "desc": "和太鼓・長唄・囲碁・百人一首など本物の文化に触れ、英語で世界に発信！"
      }
],
    school_strengths: [
      "都立中高一貫校第1号としての20年近い豊富な一貫教育ノウハウ！",
      "浅野・上野・浅草エリアの多路線アクセスで通学至便！",
      "伝統文化と英語イマージョン教育の両輪による真の国際人育成！"
],
    life_simulation: "浅草・上野の情緒ある街並みを歩いて登校。午前は基礎・応用を鍛える授業、午後は伝統芸能体験やネイティブ教員とのディスカッションを楽しみます。",
    parent_summary: "【教育方針・進学】都立中高一貫教育のパイオニア。日本の伝統文化への深い理解を礎に、高度な語学力と国際感覚を育成。国公立難関大・早慶上理への安定した進学実績を誇ります。【環境・費用】台東区の交通至便な立地。公立のため費用負担が極めて少ないのも大きな魅力です。",
    child_summary: "和太鼓を叩いたり百人一首大会をしたり、日本の楽しい伝統がたくさん体験できるよ！外国の先生とお話しする英語の授業もワクワクするよ！",
    tags: ["interest_history_culture", "interest_drawing_create", "interest_nature_biology"],
    interest_category_label: "伝統文化・グローバル",
    is_favorite: false
  },
  {
    school_id: "sch_kudan",
    name: "千代田区立九段中等教育学校",
    name_ruby: "ちよだくりつくだんちゅうとうきょういくがっこう",
    official_url: "https://www.kudan.ed.jp/school",
    catchphrase: "皇居・千代田の都心で学ぶ「九段自立」。世界に羽ばたく豊かな人間力を涵養",
    recommend_phrase: "★ 都心の文化・歴史に囲まれた最高の環境で、グローバルな探究学習に打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "千代田区九段北",
    station_name: "九段下駅",
    access_info: {
      primary_line: "東京メトロ東西線・半蔵門線・都営新宿線",
      hub_station: "大手町駅・新宿駅",
      walk_minutes: 3,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東京メトロ・都営地下鉄「九段下駅」1番出口より徒歩3分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "中等教育課程（前期・後期6年一貫）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "arts"],
    vibe_label: "都心探究・国際教養",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 63,
    match_rate_child: 94,
    recent_passed_records: "東京大学・東京外大・筑波大・早慶上理などへ高い現役合格率",
    events: [
      {
            "id": "ev_kudan_1",
            "title": "学校説明会（千代田区外受検者向け）",
            "date": "10月25日(土)",
            "type": "学校説明会",
            "desc": "九段独自の6年一貫カリキュラムと入学者決定方針を説明します。"
      }
],
    special_classes: [
      {
            "title": "千代田学＆グローバルスタディーズ",
            "desc": "近隣の大学・大使館・研究機関と連携したハイレベルな探究授業！"
      }
],
    school_strengths: [
      "九段下駅徒歩3分、都心文教エリアの比類なき好立地！",
      "千代田区立ならではの手厚い教育ICT設備と少人数指導！",
      "区民枠と都民枠があり、都内全域から志高い仲間が集う！"
],
    life_simulation: "九段下駅から皇居のお堀を眺めながら登校。先進的なICT環境で海外校とのオンライン交流やプレゼンテーションを行い、放課後は部活に打ち込みます。",
    parent_summary: "【教育方針・進学】全国唯一の区立中高一貫校。千代田区の豊富な教育リソースを活かした独自の探究教育を展開し、難関国立大・早慶等への確実な進学実績を上げています。【環境・費用】九段下駅徒歩3分の圧倒的アクセス。公立（区立）のため授業料無償で手厚い教育を受けられます。",
    child_summary: "お城のお堀や大きな日本武道館のすぐそばにあるキレイな学校！パソコンを使った授業や、海外の友達とお話しする時間がたくさんあるよ！",
    tags: ["interest_history_culture", "interest_drawing_create", "interest_puzzle_math"],
    interest_category_label: "国際教養・都心探究",
    is_favorite: false
  },
  {
    school_id: "sch_fuji_jh",
    name: "東京都立富士高等学校附属中学校",
    name_ruby: "とうきょうとりつふじこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.metro.ed.jp/fuji-s/",
    catchphrase: "「自主自律」「日進日歩」。探究「富士未来学」で未来を切り拓く",
    recommend_phrase: "★ 落ち着いた環境で科学や社会の未来をじっくり考え、確かな基礎学力を身につけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "中野区弥生町",
    station_name: "中野富士見町駅",
    access_info: {
      primary_line: "東京メトロ丸ノ内線（方南町支線）",
      hub_station: "新宿駅・中野坂上駅",
      walk_minutes: 3,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東京メトロ丸ノ内線「中野富士見町駅」より徒歩3分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "stem"],
    vibe_label: "誠実探究・アットホーム",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 91,
    recent_passed_records: "東京農工大・東京学芸大・早稲田・明治・立教など堅実な進学実績",
    events: [
      {
            "id": "ev_fuji_1",
            "title": "学校説明会",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "富士未来学の実践と6年間の学習計画をご案内します。"
      }
],
    special_classes: [
      {
            "title": "探究授業「富士未来学」",
            "desc": "身近な課題から未来の持続可能な社会を構想する6年間の探究カリキュラム！"
      }
],
    school_strengths: [
      "丸ノ内線中野富士見町駅徒歩3分の安心・快適な通学ルート！",
      "アットホームで面倒見のよい指導方針と丁寧な学習フォロー！",
      "完全中高一貫化によるきめ細かな進路・キャリア指導！"
],
    life_simulation: "丸ノ内線の駅から歩いてすぐ登校。明るい教室で友達と意見を交わしながら課題に取り組み、放課後は部活や補習・自習で充実した時間を過ごします。",
    parent_summary: "【教育方針・進学】府立五中の流れを汲む伝統の都立中高一貫校。独自探究「富士未来学」を通じて論理的思考力と表現力を育成し、国公立大学や難関私大への安定した合格実績を上げています。【環境・費用】駅近の閑静な住宅街で治安も良好。公立校のため費用面も安心です。",
    child_summary: "駅から近くて通いやすい！先生や先輩たちが優しく教えてくれて、未来のロボットや環境について考える楽しい探究授業がたくさんあるよ！",
    tags: ["interest_nature_biology", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "未来探究・堅実学習",
    is_favorite: false
  },
  {
    school_id: "sch_oizumi",
    name: "東京都立大泉高等学校附属中学校",
    name_ruby: "とうきょうとりつおおいずみこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.metro.ed.jp/oizumi-h/",
    catchphrase: "国際理解と理数探究の拠点。緑多き広大なキャンパスで世界基準の学びを",
    recommend_phrase: "★ 広々としたグラウンドで伸び伸び学び、英語や理科の実験に情熱を注ぎたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "練馬区東大泉",
    station_name: "大泉学園駅",
    access_info: {
      primary_line: "西武池袋線",
      hub_station: "池袋駅・所沢駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "西武池袋線「大泉学園駅」北口より徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "stem"],
    vibe_label: "国際理解・自然探究",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 92,
    recent_passed_records: "東京大学・東京工業大学・筑波大学・早慶などへ多数合格",
    events: [
      {
            "id": "ev_oiz_1",
            "title": "学校説明会",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "国際理解教育と理数探究プログラムの成果をご紹介します。"
      }
],
    special_classes: [
      {
            "title": "大泉グローバル＆サイエンス探究",
            "desc": "帰国生と一般生が切磋琢磨する高度な英語授業と理科実験フィールドワーク！"
      }
],
    school_strengths: [
      "広大な敷地と充実した体育館・グラウンド・特別教室棟！",
      "帰国生受け入れ校としての長い伝統とハイレベルな英語・国際教育！",
      "完全中高一貫化に伴う6年間の体系的な難関大進学カリキュラム！"
],
    life_simulation: "大泉学園駅から桜並木を通って登校。海外経験豊かな仲間と一緒に英語劇や科学実験を行い、放課後は広いグラウンドで思い切り部活に汗を流します。",
    parent_summary: "【教育方針・進学】国際理解教育と理数教育に強みを持つ都立中高一貫校。帰国生と一般生が共に学ぶ多文化環境の中で高い進学実績を実現しています。【環境・費用】練馬区の広々とした緑豊かな敷地。公立のため学費負担が小さく安心です。",
    child_summary: "校庭がすごく広くて気持ちいい！外国で暮らしていた友達も多くて、いろんな国の文化や本格的な実験を楽しく学べるよ！",
    tags: ["interest_sports_outdoor", "interest_science_space", "interest_drawing_create"],
    interest_category_label: "国際共生・理数探究",
    is_favorite: false
  },
  {
    school_id: "sch_minamitama",
    name: "東京都立南多摩中等教育学校",
    name_ruby: "とうきょうとりつみなみたまちゅうとうきょういくがっこう",
    official_url: "https://www.metro.ed.jp/minamitama-s/",
    catchphrase: "「心・知・体」の調和。フィールドワーク活動で地域と未来をデザインする",
    recommend_phrase: "★ 仲間と協力して地域の課題を調べたり、プレゼンテーションを堂々と発表したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "八王子市明神町",
    station_name: "京王八王子駅",
    access_info: {
      primary_line: "京王線・JR中央線・横浜線・八高線",
      hub_station: "新宿駅・立川駅・八王子駅",
      walk_minutes: 3,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "京王八王子駅中央口より徒歩3分、JR八王子駅北口より徒歩12分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "both"],
    vibe_label: "地域探究・自主自律",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 91,
    recent_passed_records: "東京大学・東京農工大・首都大（東京都立大）・早慶上理などへ堅実な実績",
    events: [
      {
            "id": "ev_minami_1",
            "title": "学校説明会",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "南多摩独自のフィールドワーク活動と進路実績をご紹介します。"
      }
],
    special_classes: [
      {
            "title": "フィールドワーク活動（FW）",
            "desc": "自ら現地に足を運んで調査・取材し、課題解決策を提言する体験型探究！"
      }
],
    school_strengths: [
      "京王八王子駅徒歩3分の圧倒的アクセス！多摩地区全域から通学容易！",
      "140年の伝統を誇る名門校の精神と先進中等教育の融合！",
      "公立校ならではの低負担と高い難関国公立大学合格実績！"
],
    life_simulation: "京王八王子駅から歩いて3分で校門へ。フィールドワークの準備や熱気あるグループワークを行い、放課後は部活や図書館の個別自習ブースで勉強します。",
    parent_summary: "【教育方針・進学】多摩地区最古の伝統を誇る都立中等教育学校。「フィールドワーク活動」を通じた主体的な探究学習と手厚い進学指導で、国公立大学への高い合格率を維持しています。【環境・費用】八王子中心街の駅近立地。公立のため安心の費用体系です。",
    child_summary: "街や自然に出かけてインタビューや調査をする探究学習がとても楽しい！駅からもすぐ近くて、部活動にも力いっぱい取り組めるよ！",
    tags: ["interest_history_culture", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "地域探究・体験学習",
    is_favorite: false
  },
  {
    school_id: "sch_mitaka_chuto",
    name: "東京都立三鷹中等教育学校",
    name_ruby: "とうきょうとりつみたかちゅうとうきょういくがっこう",
    official_url: "https://www.metro.ed.jp/mitaka-s/",
    catchphrase: "「思いやり・創造・自立」。豊かな自然に囲まれ、探究力と人間力を磨く",
    recommend_phrase: "★ 緑あふれる環境でじっくり学び、科学や社会のテーマを深く掘り下げたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "三鷹市新川",
    station_name: "三鷹駅",
    access_info: {
      primary_line: "JR中央線・京王線",
      hub_station: "吉祥寺駅・三鷹駅・調布駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "三鷹駅・吉祥寺駅・仙川駅・調布駅より路線バス「三鷹中等教育学校」下車すぐ"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 35,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "緑豊か・自主自律",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 92,
    recent_passed_records: "東京大・東工大・一橋大・筑波大・早慶上理などへ堅実な合格実績",
    events: [
      {
            "id": "ev_mit_1",
            "title": "学校説明会・見学会",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "6年一貫の体系的カリキュラムと探究活動をご説明します。"
      }
],
    special_classes: [
      {
            "title": "三鷹探究プログラム（MSS）",
            "desc": "データ分析と論理構成を徹底的に身につけ、自らの研究論文を執筆する授業！"
      }
],
    school_strengths: [
      "武蔵野・三鷹の緑豊かな文教エリアに位置する広大な敷地！",
      "完全6年一貫教育による高校受験のない伸び伸びとした成長！",
      "文武両道の校風で、部活動・学校行事ともに生徒が主役！"
],
    life_simulation: "バス停を降りると緑に包まれた明るい校舎。最新の理科実験室やメディアセンターで探究を深め、放課後は広いグラウンドでサッカーやテニスに熱中します。",
    parent_summary: "【教育方針・進学】三鷹市に位置する都立中等教育学校。6年間の計画的な指導により、国公立大学・難関私立大学への安定した進学実績を上げています。【環境・費用】閑静な住宅街で学習環境抜群。公立のため学費負担が極めて抑えられます。",
    child_summary: "校庭が広くて木がいっぱい！サッカーやバスケ、吹奏楽など部活動がとても盛んで、仲間と一緒に勉強も行事も全力で楽しめるよ！",
    tags: ["interest_sports_outdoor", "interest_nature_biology", "interest_science_space"],
    interest_category_label: "自然環境・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_tachikawa_kokusai",
    name: "東京都立立川国際中等教育学校",
    name_ruby: "とうきょうとりつたちかわこくさいちゅうとうきょういくがっこう",
    official_url: "https://www.metro.ed.jp/tachikawa-s/",
    catchphrase: "日本初の公立小中高一貫校。多文化共生と高度な語学力で世界とつながる",
    recommend_phrase: "★ 外国語や異文化交流が大好きで、世界中の人々と対等に意見を交わしたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "立川市曙町",
    station_name: "立川駅",
    access_info: {
      primary_line: "JR中央線・青梅線・南武線・多摩都市モノレール",
      hub_station: "立川駅・八王子駅・新宿駅",
      walk_minutes: 15,
      bus_minutes: 5,
      school_bus: false,
      school_bus_note: "JR立川駅北口より徒歩15分、またはバス5分「立川国際中等教育学校」下車"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中等教育課程（国際教育6年一貫）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["arts", "academics"],
    vibe_label: "国際理解・多文化共生",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "東京外国語大・国際教養大・東大・早慶上智・海外名門大などへ多数進学",
    events: [
      {
            "id": "ev_tachi_1",
            "title": "学校説明会・国際プログラム紹介",
            "date": "10月25日(土)",
            "type": "学校説明会",
            "desc": "充実した語学教育と附属小学校との連携、海外研修プログラムを解説します。"
      }
],
    special_classes: [
      {
            "title": "第2外国語＆国際ディベート講座",
            "desc": "英語に加えドイツ語・フランス語・中国語等を学び、世界基準のディベートに挑戦！"
      }
],
    school_strengths: [
      "公立校トップクラスのネイティブ教員数と圧倒的な語学教育環境！",
      "附属小学校を併設する公立初の12年一貫教育の先進拠点！",
      "多摩の拠点・立川駅からの充実したアクセス網！"
],
    life_simulation: "立川駅から明るい街並みを歩いて登校。校内では日常的に英語が飛び交い、海外の学校とのオンライン討論やプレゼンテーションを日常的に体験します。",
    parent_summary: "【教育方針・進学】国際教育のフロントランナーとして設立された都立中等教育学校。圧倒的な語学力養成と多文化共生マインドを育み、難関国公立大学・難関私大・海外大学への進学実績が年々向上。【環境・費用】立川市。公立のため私学と同等以上の国際教育を低負担で受けられます。",
    child_summary: "英語で話すのが楽しくなる！英語だけでなくいろんな国の言葉や文化を学べて、将来世界で活躍したい人にぴったりの学校だよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_puzzle_math"],
    interest_category_label: "グローバル・多言語探究",
    is_favorite: false
  },
  {
    school_id: "sch_ysfh",
    name: "横浜市立横浜サイエンスフロンティア高等学校附属中学校",
    name_ruby: "よこはましりつよこはまさいえんすふろんてぃあこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.edu.city.yokohama.lg.jp/school/jhs/hs-sf/",
    catchphrase: "最先端科学技術の拠点。ノーベル賞学者や研究機関と連携する理数英才教育",
    recommend_phrase: "★ 宇宙・生命科学・ロボット・情報技術に夢中になれる、日本最高峰の理数環境で学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "横浜市鶴見区小野町",
    station_name: "鶴見小野駅",
    access_info: {
      primary_line: "JR鶴見線",
      hub_station: "鶴見駅・横浜駅・川崎駅",
      walk_minutes: 2,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR鶴見線「鶴見小野駅」より徒歩2分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "理数科（中高一貫課程）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "最先端科学・研究探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 97,
    recent_passed_records: "東京大学・東京工業大学・国公立大学医学部・難関理系学部へ圧倒的な実績",
    events: [
      {
            "id": "ev_ysfh_1",
            "title": "科学体験ラボ＆学校説明会",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "大学・企業顔負けの電子顕微鏡や最先端研究設備を体感できます。"
      },
      {
            "id": "ev_ysfh_2",
            "title": "蒼煌祭（文化祭）",
            "date": "9月27日(土)",
            "type": "文化祭",
            "desc": "生徒たちによるハイレベルな科学研究発表やロボット実演が必見！"
      }
],
    special_classes: [
      {
            "title": "サイエンス・リサーチ（課題研究）",
            "desc": "理化学研究所や先端企業の研究者から直接指導を受け、自らの研究論文を執筆！"
      }
],
    school_strengths: [
      "大学院レベルの電子顕微鏡やクリーンルームを備えた国内最高峰の実験設備！",
      "理化学研究所横浜キャンパス等との強力な産官学連携！",
      "鶴見小野駅徒歩2分の好立地と公立一貫校ならではの学費無償！"
],
    life_simulation: "鶴見小野駅から徒歩2分。白衣に着替えて本格的な顕微鏡や実験装置に向かい、放課後は科学部やロボットコンテストのチームで深夜まで熱中します。",
    parent_summary: "【教育方針・進学】横浜市が世界レベルの科学者・技術者育成を目指して設立したフラッグシップ校。理化学研究所等の最先端研究機関と直結した教育を行い、東大・東工大・医学部等に抜群の合格実績を誇ります。【環境・費用】公立校のため学費は格安で、私学を凌駕する設備を利用可能です。",
    child_summary: "理科や実験が大好きな人には夢のような学校！本物の科学者が使うすごい実験器具や電子顕微鏡を使って、宇宙や生物の秘密を解き明かそう！",
    tags: ["interest_science_space", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "最先端科学・理数特化",
    is_favorite: false
  },
  {
    school_id: "sch_minami_fuzoku",
    name: "横浜市立南高等学校附属中学校",
    name_ruby: "よこはましりつみなみこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://www.edu.city.yokohama.lg.jp/school/jhs/hs-minami/",
    catchphrase: "自立と探究の「南風」。高い学力と豊かな人間性を育む横浜の公立トップ校",
    recommend_phrase: "★ 文武両道で仲間と高め合い、国際社会でリーダーシップを発揮したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "横浜市港南区東永谷",
    station_name: "上大岡駅",
    access_info: {
      primary_line: "京急本線・横浜市営地下鉄ブルーライン",
      hub_station: "横浜駅・上大岡駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "上大岡駅・弘明寺駅より路線バス約10分「南高校前」下車すぐ"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "文武両道・高い志",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 63,
    match_rate_child: 94,
    recent_passed_records: "東京大学・横浜国立大学・横浜市立大学医学部・早慶上理へ多数進学",
    events: [
      {
            "id": "ev_sminami_1",
            "title": "学校説明会・オープンスクール",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "南高独自の探究「EGG」と6年間の一貫指導について説明します。"
      }
],
    special_classes: [
      {
            "title": "探究活動「EGG（未来への挑戦）」",
            "desc": "グローバルな課題に対して多角的にアプローチし、提言する探究型カリキュラム！"
      }
],
    school_strengths: [
      "横浜市立大・横浜国立大をはじめとする難関国公立大学への高い進学実績！",
      "活気あふれる生徒自治と文武両道を体現する充実した部活動！",
      "公立校のため学費の心配なく6年間の高水準教育を完結！"
],
    life_simulation: "上大岡駅からバスで丘の上の緑豊かなキャンパスへ。活発な討論と確かな基礎演習を両立し、放課後は部活動に全力投球して心身を鍛えます。",
    parent_summary: "【教育方針・進学】横浜市立屈指の進学校。6年一貫教育の完成により、東大・横国大・医学部など難関大への現役進学率が極めて高く推移しています。【環境・費用】丘陵地の広々としたキャンパス。公立のため授業料無償でコストパフォーマンスが抜群です。",
    child_summary: "運動も勉強もどっちも一生懸命頑張りたい子に最高！先輩後輩の仲がとても良くて、文化祭や体育祭もみんなで本気で熱狂できる学校だよ！",
    tags: ["interest_sports_outdoor", "interest_history_culture", "interest_puzzle_math"],
    interest_category_label: "文武両道・リーダーシップ",
    is_favorite: false
  },
  {
    school_id: "sch_sagamihara_chuto",
    name: "神奈川県立相模原中等教育学校",
    name_ruby: "かながわけんりつさがみはらちゅうとうきょういくがっこう",
    official_url: "https://www.pen-kanagawa.ed.jp/sagamihara-chuto-ss/",
    catchphrase: "「信愛・調和・開拓」。相模原の緑の中で未来を拓く県立中等教育の旗手",
    recommend_phrase: "★ 落ち着いた環境の中で自ら課題を見つけて探究し、国公立難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "相模原市南区相模大野",
    station_name: "相模大野駅",
    access_info: {
      primary_line: "小田急小田原線・江ノ島線",
      hub_station: "新宿駅・町田駅・相模大野駅",
      walk_minutes: 15,
      bus_minutes: 5,
      school_bus: false,
      school_bus_note: "小田急線「相模大野駅」北口より徒歩15分（またはバス約5分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "stem"],
    vibe_label: "自主自立・探究学習",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 63,
    match_rate_child: 94,
    recent_passed_records: "東京大学・東京工業大学・東北大学・横浜国立大学などへ毎年多数合格",
    events: [
      {
            "id": "ev_saga_1",
            "title": "学校説明会・見学会",
            "date": "10月4日(土)",
            "type": "学校説明会",
            "desc": "6年間を見通したカリキュラムと探究学習の成果を展示します。"
      }
],
    special_classes: [
      {
            "title": "相模原探究プロジェクト",
            "desc": "宇宙科学研究所（JAXA相模原）等の立地を活かした先端科学と地域探究！"
      }
],
    school_strengths: [
      "JAXA相模原キャンパスとの連携など科学教育のリソースが充実！",
      "相模大野駅からの徒歩圏で町田・新宿方面からもアクセス良好！",
      "県立中等教育学校として安定した最難関大学合格実績！"
],
    life_simulation: "相模大野駅から緑道を通って登校。自習室や探究スペースを活用して仲間と議論を重ね、放課後は部活動や実験のまとめに打ち込みます。",
    parent_summary: "【教育方針・進学】神奈川県が誇る県立中等教育学校の代表格。6年間一貫した論理的探究指導と学習管理により、東大・東工大など難関国公立大学への高い現役進学実績を確立。【環境・費用】小田急線相模大野駅徒歩圏。公立のため授業料無償です。",
    child_summary: "JAXA（宇宙の研究所）の近くにあって、星やロケット、科学の探究が大好きな仲間が集まるよ！先生もみんな親切で楽しく学べるよ！",
    tags: ["interest_science_space", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "宇宙・先端科学探究",
    is_favorite: false
  },
  {
    school_id: "sch_saitama_urawa",
    name: "さいたま市立浦和中学校",
    name_ruby: "さいたましりつうらわちゅうがっこう",
    official_url: "http://www.m-urawa.ed.jp/",
    catchphrase: "文武両道・自由闊達。埼玉の文教都市・浦和で未来のグローバルリーダーを育む",
    recommend_phrase: "★ 高い学力と強い団結力を持ち、部活も勉強も行事も全力で打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "埼玉県",
    district: "さいたま市浦和区元町",
    station_name: "北浦和駅",
    access_info: {
      primary_line: "JR京浜東北線",
      hub_station: "大宮駅・赤羽駅・東京駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR京浜東北線「北浦和駅」東口より徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "文武両道・高い志",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 96,
    recent_passed_records: "東京大学・京都大学・国公立医学部・早慶上理へ圧倒的な合格者数",
    events: [
      {
            "id": "ev_surawa_1",
            "title": "学校説明会・授業公開",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "高い合格実績を支えるカリキュラムと部活動の両立を語ります。"
      }
],
    special_classes: [
      {
            "title": "市立浦和探究ゼミ＆インターナショナルプログラム",
            "desc": "高度な英語コミュニケーションと世界的な社会課題の解決策を模索する授業！"
      }
],
    school_strengths: [
      "埼玉県内公立一貫校最高峰の偏差値と抜群の東大・難関大合格実績！",
      "北浦和駅徒歩10分の通学利便性と浦和の文教地区に位置する安心環境！",
      "サッカー部をはじめとする名門部活動と学業の完璧な両立！"
],
    life_simulation: "北浦和駅から街路樹の並ぶ道を歩いて登校。高い意欲を持つ仲間と熱気あふれる授業を受け、放課後は部活に汗を流したあと自習室で集中して学習します。",
    parent_summary: "【教育方針・進学】「市立浦和」の名で親しまれる名門中高一貫校。高い学力指導と生徒自治を両輪とし、東大・難関国立大・早慶に驚異的な合格実績を残しています。【環境・費用】浦和の閑静な住宅街。公立校のため費用対効果が極めて優れています。",
    child_summary: "勉強もサッカーや部活動も全部本気！学校全体が活気にあふれていて、頼もしい先輩たちと一緒に大きな夢に向かって走れる学校だよ！",
    tags: ["interest_sports_outdoor", "interest_history_culture", "interest_puzzle_math"],
    interest_category_label: "文武両道・リーダーシップ",
    is_favorite: false
  },
  {
    school_id: "sch_ohmiya_kokusai",
    name: "さいたま市立大宮国際中等教育学校",
    name_ruby: "さいたましりつおおみやこくさいちゅうとうきょういくがっこう",
    official_url: "https://www.city-saitama.ed.jp/ohmiyakokusai-h/",
    catchphrase: "国際バカロレア（IB）認定校。グローバル社会で価値を創造するリーダーへ",
    recommend_phrase: "★ 世界基準の探究学習（IBプログラム）や英語でのコミュニケーションを存分に体験したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "埼玉県",
    district: "さいたま市大宮区三橋",
    station_name: "大宮駅",
    access_info: {
      primary_line: "JR各線・東武野田線・ニューシャトル",
      hub_station: "大宮駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "大宮駅西口より路線バス約10分「並木南町」下車徒歩2分"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中等教育課程（IB国際バカロレアコース併設）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["arts", "academics"],
    vibe_label: "国際バカロレア・自由闊達",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "東京外大・筑波大・早慶上智・海外有名大学へ多数進学",
    events: [
      {
            "id": "ev_omiya_ib_1",
            "title": "IBプログラム説明会・体験授業",
            "date": "10月25日(土)",
            "type": "学校説明会",
            "desc": "世界基準の国際バカロレア教育と英語イマージョン授業を体験！"
      }
],
    special_classes: [
      {
            "title": "IB（国際バカロレア）MYP/DPプログラム",
            "desc": "教科を横断した課題探究と英語による論文執筆・プレゼンテーション！"
      }
],
    school_strengths: [
      "公立中等教育学校として国内屈指の本格的国際バカロレア認定校！",
      "巨大ターミナル大宮駅からの抜群のアクセス！",
      "海外大学・国内最難関大の総合型選抜に圧倒的な強み！"
],
    life_simulation: "大宮駅からバスで登校。多国籍な先生たちと英語で会話し、答えが一つではない社会問題についてディスカッションを重ねます。",
    parent_summary: "【教育方針・進学】国際バカロレア（IB）の中等教育プログラム（MYP）およびディプロマプログラム（DP）を導入する公立中等教育学校。海外名門大学や国内最難関大の推薦・総合型選抜で抜群の実績を上げています。【環境・費用】大宮エリア。公立のためIB教育を破格の低費用で受講可能。",
    child_summary: "教科書の丸暗記じゃない、世界とつながる楽しい勉強ができる！英語を使って自分の意見をみんなの前で堂々と発表できるようになるよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_puzzle_math"],
    interest_category_label: "国際バカロレア・探究",
    is_favorite: false
  },
  {
    school_id: "sch_kenritsu_chiba",
    name: "千葉県立千葉中学校",
    name_ruby: "ちばけんりつちばちゅうがっこう",
    official_url: "https://cms1.chiba-c.ed.jp/chiba-j/",
    catchphrase: "名門・県立千葉の伝統。高い知性と高潔な人格を培う公立の最高峰",
    recommend_phrase: "★ 千葉県最高峰の環境で、学問の本質を深く探究し社会をリードする人材になりたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "千葉県",
    district: "千葉市中央区葛城",
    station_name: "本千葉駅",
    access_info: {
      primary_line: "JR外房線・内房線・千葉都市モノレール",
      hub_station: "千葉駅・蘇我駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR「本千葉駅」より徒歩10分、モノレール「県庁前駅」徒歩9分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "stem"],
    vibe_label: "自由・真理探究",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 96,
    recent_passed_records: "東京大学・京都大学・千葉大学医学部など最難関国立大学に多数合格",
    events: [
      {
            "id": "ev_kchiba_1",
            "title": "学校説明会・教育活動紹介",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "伝統ある県立千葉の一貫教育と高い進学成果を説明します。"
      }
],
    special_classes: [
      {
            "title": "未来を拓くリベラルアーツ探究",
            "desc": "哲学・数理科学・社会思想の古典から現代の諸問題までを幅広く探究！"
      }
],
    school_strengths: [
      "千葉県公立ナンバーワンの歴史・伝統と圧倒的な東大・難関大合格実績！",
      "生徒の自主性を重んじる自由な校風とハイレベルな切磋琢磨の環境！",
      "本千葉駅徒歩10分で千葉県内全域から無理なく通学可能！"
],
    life_simulation: "本千葉駅から歴史ある坂道を登って登校。大学レベルの講義やゼミ形式の授業を受け、放課後は文化部や運動部、自習室で充実した放課後を過ごします。",
    parent_summary: "【教育方針・進学】千葉県公立校の頂点に君臨する名門校。中高一貫化によりさらに進学実績が伸長し、東大・京大・国公立医学部に安定した多数の合格者を誇ります。【環境・費用】県庁至近の歴史ある文教の地。公立校のため学費は格安です。",
    child_summary: "千葉県で一番勉強ができるすごい先輩や友達が集まる場所！教科書の先にある面白い学問の世界を思いきり探究できるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_history_culture"],
    interest_category_label: "高度学術・リベラルアーツ",
    is_favorite: false
  },
  {
    school_id: "sch_toukatsu",
    name: "千葉県立東葛飾中学校",
    name_ruby: "ちばけんりつとうかつしかちゅうがっこう",
    official_url: "https://cms1.chiba-c.ed.jp/tohkatsu-jh/",
    catchphrase: "「自主自律」。東葛の自由な気風の中で創造力と知性を羽ばたかせる",
    recommend_phrase: "★ 校則に縛られず自由な雰囲気の中で、自分の好きな研究や行事に熱中したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "千葉県",
    district: "柏市旭町",
    station_name: "柏駅",
    access_info: {
      primary_line: "JR常磐線・東武アーバンパークライン",
      hub_station: "上野駅・船橋駅・松戸駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR常磐線・東武野田線「柏駅」西口より徒歩8分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "自由闊達・自主自立",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "東京大学・東北大学・筑波大学・東京理科大などへ多数合格",
    events: [
      {
            "id": "ev_toukatsu_1",
            "title": "学校説明会・見学会",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "東葛独自の探究「東葛リサーチ」と活気ある学校生活をご紹介します。"
      }
],
    special_classes: [
      {
            "title": "東葛リサーチ（課題研究）",
            "desc": "自ら設定したテーマについて3年間かけて調査・実験・論文執筆を行う本格探究！"
      }
],
    school_strengths: [
      "柏駅西口徒歩8分の抜群の交通アクセス！",
      "私服通学も可能な極めて自由で自主性を尊重する伝統の校風！",
      "県立千葉と並び称される千葉県公立トップクラスの難関大合格実績！"
],
    life_simulation: "柏駅から賑やかな商店街を抜けてすぐ登校。生徒自らが企画する行事やハイレベルな探究授業を楽しみ、放課後は部活や自習に自由に取り組みます。",
    parent_summary: "【教育方針・進学】東葛エリアを代表する名門校。徹底した自主自律の校風のもと、深い探究心と高い教養を身につけ、難関国立大・早慶理科大等へ高い現役合格実績を残しています。【環境・費用】柏駅至近で利便性抜群。公立のため授業料無償です。",
    child_summary: "制服がなくて私服で通える自由でかっこいい学校！文化祭や体育祭も生徒たちがゼロから作り上げて、思い切り熱中できるよ！",
    tags: ["interest_puzzle_math", "interest_drawing_create", "interest_nature_biology"],
    interest_category_label: "自由闊達・自律探究",
    is_favorite: false
  },
  {
    school_id: "sch_sakuyakonohana",
    name: "大阪府立咲くやこの花中学校",
    name_ruby: "おおさかふりつさくやこのはなちゅうがっこう",
    official_url: "https://www3.osaka-c.ed.jp/sakuyakonohana-js/",
    catchphrase: "ものづくり・スポーツ・言語・芸術。4つの分野で個性を輝かせる公立中高一貫校",
    recommend_phrase: "★ ロボットや絵画、言葉の表現など自分の「大好きな分野」をとことん極めたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "大阪府",
    district: "大阪市此花区西九条",
    station_name: "西九条駅",
    access_info: {
      primary_line: "JR大阪環状線・阪神なんば線",
      hub_station: "大阪（梅田）駅・なんば駅・天王寺駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR大阪環状線・阪神なんば線「西九条駅」より徒歩5分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "総合学科（ものづくり・スポーツ・言語・芸術分野）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "arts"],
    vibe_label: "個性伸長・専門探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 93,
    recent_passed_records: "大阪大学・神戸大学・大阪公立大学・芸術大学など多彩な進路実績",
    events: [
      {
            "id": "ev_sakuya_1",
            "title": "4分野別体験フェスタ＆説明会",
            "date": "10月4日(土)",
            "type": "学校説明会",
            "desc": "ロボット工作・造形芸術・英語スピーチなどの専門施設を体験できます。"
      }
],
    special_classes: [
      {
            "title": "ものづくり・理工探究ゼミ",
            "desc": "最新の3Dプリンタやプログラミング環境を活用した本格的な作品制作！"
      }
],
    school_strengths: [
      "西九条駅徒歩5分の抜群の交通至便立地！大阪市内外から通学容易！",
      "全国的にも珍しい「ものづくり・芸術・言語・スポーツ」の専門分野別指導！",
      "公立校のため学費の心配なく専門的な施設・機材を存分に活用可能！"
],
    life_simulation: "西九条駅から徒歩5分。アトリエや工房、広いアリーナなど専門設備が揃う校舎で好きな研究に打ち込み、放課後はコンテストに向けて仲間と制作を進めます。",
    parent_summary: "【教育方針・進学】大阪府立の中高一貫校。4つの専門分野（ものづくり、スポーツ、言語、芸術）を設置し、生徒の才能を早期から開花させ、国公立大・難関私大への確実な進学を実現。【環境・費用】西九条駅すぐ。公立のため授業料無償で専門教育が受けられます。",
    child_summary: "工作やロボット、絵を描くこと、英語が好きな子にはたまらない！専門の工房や広い体育館で、自分の得意なことを毎日思いきり楽しめるよ！",
    tags: ["interest_drawing_create", "interest_science_space", "interest_sports_outdoor"],
    interest_category_label: "専門探究・ものづくり芸術",
    is_favorite: false
  },
  {
    school_id: "sch_rakuhoku_fuzoku",
    name: "京都府立洛北高等学校附属中学校",
    name_ruby: "きょうとふりつらくほくこうとうがっこうふぞくちゅうがっこう",
    official_url: "http://www.kyoto-be.ne.jp/rakuhoku-hs/",
    catchphrase: "ノーベル賞学者・湯川秀樹の母校。「あくなき真理探究」の精神が息づく京都の名門",
    recommend_phrase: "★ 数学や自然科学の謎を解き明かし、京都の落ち着いた学術環境で深く学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "京都府",
    district: "京都市左京区下鴨梅ノ木町",
    station_name: "北山駅",
    access_info: {
      primary_line: "京都市営地下鉄烏丸線",
      hub_station: "京都駅・四条駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄烏丸線「北山駅」または「松ヶ崎駅」より徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫コース）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "科学探究・学術思索",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "京都大学・大阪大学・国公立大学医学部に毎年多数の現役合格",
    events: [
      {
            "id": "ev_rakuhoku_1",
            "title": "学校説明会・洛北サイエンス体験",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "湯川秀樹博士の伝統を受け継ぐ理数探究教育の魅力を伝えます。"
      }
],
    special_classes: [
      {
            "title": "洛北サイエンス＆フロンティア探究",
            "desc": "京都大学など研究機関と連携し、身の回りの物理・化学の謎を実験解明！"
      }
],
    school_strengths: [
      "湯川秀樹・朝永振一郎両ノーベル賞博士を育んだ旧制京都一中の誇り高き伝統！",
      "京都大学への現役合格率をはじめとする圧倒的な国公立難関大実績！",
      "下鴨神社の緑にほど近い静謐でアカデミックな教育環境！"
],
    life_simulation: "北山駅から鴨川の風を感じながら登校。ハイレベルな理数ゼミや文学の読解に集中し、放課後は実験室や自習室で仲間と知的な議論を交わします。",
    parent_summary: "【教育方針・進学】府立一中を前身とする京都最古の公立名門校。伝統の「洛北サイエンス」を通じて論理的・科学的思考力を徹底的に磨き、京大をはじめとする難関国公立大学へ抜群の実績を誇ります。【環境・費用】左京区下鴨の文教エリア。公立のため学費負担も最小限です。",
    child_summary: "ノーベル賞をもらった湯川秀樹先生の母校！理科の実験や算数のパズルが大好きな仲間と一緒に、宇宙や自然の不思議をとことん探究できるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_nature_biology"],
    interest_category_label: "科学真理探究・学術",
    is_favorite: false
  },
  {
    school_id: "sch_azabu",
    name: "麻布中学校",
    name_ruby: "あざぶちゅうがっこう",
    official_url: "https://www.azabu-jh.ed.jp/",
    catchphrase: "「自由闊達・自主自立」。校則のない学び舎で、自らの頭で考え抜く個性を育む男子御三家",
    recommend_phrase: "★ 何事にも縛られず、自分の興味をトコトン突き詰めて深い議論を楽しみたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "港区南麻布",
    station_name: "広尾駅",
    access_info: {
      primary_line: "東京メトロ日比谷線",
      hub_station: "恵比寿駅・六本木駅・中目黒駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東京メトロ日比谷線「広尾駅」より徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 980000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "自由奔放・徹底思考",
    club_label: "極めて活発",
    record_label: "◎",
    deviation_score: 71,
    match_rate_child: 98,
    recent_passed_records: "東京大学・京都大学・国公立大学医学部に毎年100名以上の合格者を輩出",
    events: [
      {
            "id": "ev_azabu_1",
            "title": "麻布学園文化祭",
            "date": "5月2日(土)〜4日(月)",
            "type": "文化祭",
            "desc": "生徒たちだけで完全に運営される伝説の文化祭。展示・論文・髪染めまで圧巻の熱量！"
      },
      {
            "id": "ev_azabu_2",
            "title": "学校説明会",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "麻布の自由教育の真髄と教育方針を語る説明会です。"
      }
],
    special_classes: [
      {
            "title": "オリジナル教養テキスト＆自由研究ゼミ",
            "desc": "検定教科書にとらわれず、教員自作の本格教材で学問の深奥を議論！"
      }
],
    school_strengths: [
      "開成・武蔵と並ぶ男子御三家筆頭！圧倒的な東大合格実績と独自の学風！",
      "細かな校則がなく、髪型や服装も含め生徒自身の自己責任と自主性を徹底尊重！",
      "政財界・学術・文化界の第一線で活躍する個性豊かなOBネットワーク！"
],
    life_simulation: "広尾駅から有栖川公園の緑を抜けて登校。教室では教員と生徒が対等に学問を論じ合い、放課後は部活動や文化祭の準備に夜遅くまで熱中します。",
    parent_summary: "【教育方針・進学】東京男子御三家の一角。明文化された校則を持たず、徹底した自由と自立のもとで自ら思考・判断する力を養成。東大をはじめとする最難関大学へ毎年多数の合格者を輩出。【環境・費用】港区南麻布の閑静な邸宅街。私立男子進学校の最高峰です。",
    child_summary: "校則がなくてとにかく自由！自分の好きなことや面白いと思ったことをとことん研究できて、ユニークで頭のいい最高の仲間と出会える学校だよ！",
    tags: ["interest_puzzle_math", "interest_history_culture", "interest_science_space"],
    interest_category_label: "自由闊達・本質思考",
    is_favorite: false
  },
  {
    school_id: "sch_musashi_boys",
    name: "武蔵中学校",
    name_ruby: "むさしちゅうがっこう",
    official_url: "https://www.musashi.ed.jp/",
    catchphrase: "「自ら調べ自ら考える」。豊かな緑の武蔵野で本物に触れる男子御三家の名門",
    recommend_phrase: "★ 広大な自然の中で本物の実験や原典講読を楽しみ、学問の根本をじっくり学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "練馬区豊玉上",
    station_name: "江古田駅",
    access_info: {
      primary_line: "西武池袋線・都営大江戸線・西武有楽町線",
      hub_station: "池袋駅・新宿駅・練馬駅",
      walk_minutes: 6,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "西武池袋線「江古田駅」徒歩6分、都営大江戸線「新江古田駅」徒歩7分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 950000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "本物志向・自調自考",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 96,
    recent_passed_records: "東京大学・東京工業大学・国公立大学医学部に高い合格率",
    events: [
      {
            "id": "ev_musashi_1",
            "title": "記念祭（文化祭）",
            "date": "4月26日(土)〜27日(日)",
            "type": "文化祭",
            "desc": "生物部や物理部による本格的な研究展示が全国的に有名な伝統の祭典！"
      }
],
    special_classes: [
      {
            "title": "本物に触れる野外実習＆原典購読",
            "desc": "校内の川や林でのフィールドワークや、一人一台の顕微鏡を使った本格実験！"
      }
],
    school_strengths: [
      "広大な武蔵野の自然林と小川が流れる都内随一の緑豊かなキャンパス！",
      "男子御三家の一角。少人数教育と記述・対話を重視したハイレベルな学問指導！",
      "江古田駅徒歩6分のアクセスと池袋・新宿からの至近な通学環境！"
],
    life_simulation: "江古田駅から緑の木立へ。授業では顕微鏡で生きたプランクトンを観察したり、歴史の原典資料を読み解いたり。放課後は自然に囲まれた校庭で仲間と過ごします。",
    parent_summary: "【教育方針・進学】男子御三家の一角。「自ら調べ自ら考える」自調自考の精神のもと、詰め込みを排し、本物に触れる実体験と徹底した記述指導を展開。東大をはじめとする難関大学へ多数の進学者を送り出しています。【環境・費用】広大な自然林を抱える贅沢な学習環境。",
    child_summary: "学校の中に本物の小川や森がある！理科の授業では一人に一つずつ顕微鏡があって、生き物や星を心ゆくまで調べられるワクワクいっぱいの学校だよ！",
    tags: ["interest_nature_biology", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "自然体験・本物探究",
    is_favorite: false
  },
  {
    school_id: "sch_komaba_toho",
    name: "駒場東邦中学校",
    name_ruby: "こまばとうほうちゅうがっこう",
    official_url: "https://www.komabatoho-jh.ed.jp/",
    catchphrase: "「自主・理愛・勤勉」。駒場の緑の中で確かな知性と友愛を育む名門男子進学校",
    recommend_phrase: "★ 仲間と団結して体育祭や文化祭に燃え、理科の実験や東大進学に全力で挑戦したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "世田谷区池尻",
    station_name: "駒場東大前駅",
    access_info: {
      primary_line: "京王井の頭線・東急田園都市線",
      hub_station: "渋谷駅・吉祥寺駅・二子玉川駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "京王井の頭線「駒場東大前駅」徒歩10分、田園都市線「池尻大橋駅」徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 970000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "stem"],
    vibe_label: "文武両道・熱い絆",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 69,
    match_rate_child: 97,
    recent_passed_records: "東京大学・国公立大学医学部に毎年圧倒的な合格実績（東大合格者数全国トップクラス）",
    events: [
      {
            "id": "ev_kt_1",
            "title": "文化祭（駒東祭）",
            "date": "9月20日(土)〜21日(日)",
            "type": "文化祭",
            "desc": "男子校ならではの活気と知的な展示、熱狂的なステージが魅力の文化祭！"
      },
      {
            "id": "ev_kt_2",
            "title": "体育祭",
            "date": "5月17日(土)",
            "type": "学校行事",
            "desc": "全校が色別に分かれて激突する駒東名物の熱い体育祭！"
      }
],
    special_classes: [
      {
            "title": "充実の理科4分野実験＆東邦大医学部連携講座",
            "desc": "中学3年間で100回以上の実験を実施し、科学的思考力を徹底的に鍛え上げる！"
      }
],
    school_strengths: [
      "東大合格者数・医学部合格実績で常に全国最上位を維持！",
      "渋谷から至近（駒場東大前・池尻大橋）の極めて良好な都心アクセス！",
      "充実した実験室と圧倒的な実験回数で理系・医学部に強い！"
],
    life_simulation: "渋谷から井の頭線で数分、駒場東大前駅から歩いて登校。午前はレベルの高い数学や英語の授業、午後は本格的な実験を行い、放課後は部活と自習に熱中します。",
    parent_summary: "【教育方針・進学】東大合格者数で全国屈指の実績を誇る最難関男子進学校。医学部系大学との連携もあり、医学部進学実績も突出。面倒見の良さと自由な活気が見事に調和しています。【環境・費用】世田谷区池尻・目黒区境の緑豊かな教育地区に位置。",
    child_summary: "体育祭や文化祭の熱気がすごい！理科の実験が中学だけで100回以上もあって、面白い実験をしながら仲間と本気で競い合える学校だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_sports_outdoor"],
    interest_category_label: "理数科学・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_kaijo",
    name: "海城中学校",
    name_ruby: "かいじょうちゅうがっこう",
    official_url: "https://www.kaijo.ed.jp/",
    catchphrase: "「新しい紳士の手ほどき」。先進のサイエンスセンターとドラマ教育で人間力を磨く",
    recommend_phrase: "★ 先進的な理科実験やグローバル社会課題の解決に興味があり、確かな難関大進学力をつけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "新宿区大久保",
    station_name: "新大久保駅",
    access_info: {
      primary_line: "JR山手線・中央総武線・東京メトロ副都心線",
      hub_station: "新宿駅・高田馬場駅・池袋駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR山手線「新大久保駅」徒歩5分、総武線「大久保駅」徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 20,
    tuition: 980000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "先進科学・紳士教育",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 69,
    match_rate_child: 96,
    recent_passed_records: "東京大学・京都大学・国公立大医学部へ安定して50名以上の東大合格実績",
    events: [
      {
            "id": "ev_kaijo_1",
            "title": "海原祭（文化祭）",
            "date": "9月13日(土)〜14日(日)",
            "type": "文化祭",
            "desc": "サイエンスセンターでの公開実験や生徒の研究論文発表が見どころ！"
      }
],
    special_classes: [
      {
            "title": "サイエンスセンター探究＆PA（プロジェクトアドベンチャー）",
            "desc": "大学水準の実験棟での課題研究と、協調性・リーダーシップを養う体験教育！"
      }
],
    school_strengths: [
      "最新鋭の理科教育施設「サイエンスセンター」による圧倒的な実験環境！",
      "新大久保駅徒歩5分、新宿・池袋からすぐの抜群の通学アクセス！",
      "社会科総合学習やドラマ教育など「発信力・対話力」を高める独自の人間教育！"
],
    life_simulation: "山手線新大久保駅から歩いて5分。ガラス張りのサイエンスセンターで高度な生物・化学の実験を行い、放課後は体育館や自習ラウンジで仲間と過ごします。",
    parent_summary: "【教育方針・進学】「新しい紳士の育成」を掲げる名門男子進学校。対話力・表現力を鍛える社会科探究やドラマ教育、最新鋭のサイエンスセンターでの実験教育が高い評価を獲得。東大・医学部実績も盤石です。【環境・費用】山手線新大久保駅徒歩5分で極めて良好な通学利便性。",
    child_summary: "超ハイテクな理科実験ビル（サイエンスセンター）があって実験が最高に楽しい！仲間と協力して体を動かすアドベンチャープログラムもワクワクするよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_drawing_create"],
    interest_category_label: "先進理数・人間力探究",
    is_favorite: false
  },
  {
    school_id: "sch_waseda_jh",
    name: "早稲田中学校",
    name_ruby: "わせだちゅうがっこう",
    official_url: "https://www.waseda-h.ed.jp/",
    catchphrase: "大隈重信の志を継ぐ。「誠実・剛毅・雄弁」で東大・早大の両方を狙える名門男子校",
    recommend_phrase: "★ 早稲田大学の推薦枠を確保しつつ、東京大学や国公立医学部にも果敢に挑戦したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "新宿区馬場下町",
    station_name: "早稲田駅",
    access_info: {
      primary_line: "東京メトロ東西線",
      hub_station: "大手町駅・飯田橋駅・高田馬場駅",
      walk_minutes: 1,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東京メトロ東西線「早稲田駅」3b出口より徒歩1分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 20,
    tuition: 940000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "質実剛健・高い志",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 96,
    recent_passed_records: "東京大学40名前後合格＋早稲田大学へ約50%が推薦進学する抜群の進学力",
    events: [
      {
            "id": "ev_waseda_1",
            "title": "興風祭（文化祭）",
            "date": "9月27日(土)〜28日(日)",
            "type": "文化祭",
            "desc": "早稲田魂あふれる熱気ある展示やクラブ発表が盛り上がる名物行事！"
      }
],
    special_classes: [
      {
            "title": "早稲田大学連携講義＆グローバルゼミ",
            "desc": "早大理工学部・法学部などの教授陣による特別授業や研究室見学！"
      }
],
    school_strengths: [
      "東西線早稲田駅徒歩1分の至近距離！雨の日も快適に通学可能！",
      "早稲田大学への推薦枠を約5割保持しながら、東大・国公立大へ多数挑戦できる独自ポジション！",
      "文武両道の質実剛健な男子校カルチャーと熱い絆！"
],
    life_simulation: "地下鉄早稲田駅を出てわずか1分で校舎へ。早稲田大学のキャンパスを隣に見ながら学問に励み、放課後はグラウンドや道場で部活に汗を流します。",
    parent_summary: "【教育方針・進学】大隈重信の創設精神を受け継ぐ系属校。早稲田大学への約50％の推薦枠を保持しつつ、東大をはじめとする難関国公立大学への一般受験指導にも徹底注力。安全弁と高い挑戦意欲を兼ね備えた屈指の人気校です。【環境・費用】早稲田駅徒歩1分。",
    child_summary: "地下鉄の駅から歩いて1分！早稲田大学のすぐ隣にあって、大学の先生のお話を聞いたり、部活も勉強もかっこいい先輩たちと全力で頑張れるよ！",
    tags: ["interest_sports_outdoor", "interest_puzzle_math", "interest_history_culture"],
    interest_category_label: "質実剛健・早大連携",
    is_favorite: false
  },
  {
    school_id: "sch_waseda_jitsugyo",
    name: "早稲田実業学校中等部",
    name_ruby: "わせだじつぎょうがっこうちゅうとうぶ",
    official_url: "https://www.wasedajg.ed.jp/",
    catchphrase: "「去華就実」「三敬主義」。国分寺の緑の中で早稲田の精神を受け継ぐ伝統共学校",
    recommend_phrase: "★ 早稲田大学へ全員進学を目指し、勉学もスポーツも行事も一生モノの仲間と謳歌したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "国分寺市本町",
    station_name: "国分寺駅",
    access_info: {
      primary_line: "JR中央線・西武国分寺線・多摩湖線",
      hub_station: "新宿駅・立川駅・吉祥寺駅",
      walk_minutes: 7,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR中央線・西武線「国分寺駅」北口より徒歩7分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（早稲田大学系属小中高一貫）",
    commute_time: 30,
    tuition: 1050000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["both", "academics"],
    vibe_label: "去華就実・文武両道",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 67,
    match_rate_child: 95,
    recent_passed_records: "卒業生のほぼ全員（約98%以上）が早稲田大学の各学部へ進学",
    events: [
      {
            "id": "ev_wj_1",
            "title": "稲実祭（文化祭）",
            "date": "10月4日(土)〜5日(日)",
            "type": "文化祭",
            "desc": "小中高合同の巨大文化祭。活気あふれる模擬店や応援指導部の熱演！"
      }
],
    special_classes: [
      {
            "title": "早稲田大学直結リサーチプログラム",
            "desc": "大学の各学部との連携講座や論文作成を通じた先取り高等教育！"
      }
],
    school_strengths: [
      "早稲田大学へのほぼ100%の推薦進学保証と豊富な学部選択肢！",
      "JR中央線特快停車駅・国分寺駅徒歩7分の抜群の通学利便性！",
      "甲子園優勝の硬式野球部をはじめとする全国トップレベルのクラブ活動！"
],
    life_simulation: "国分寺駅から歩いて7分。広々としたグラウンドと近代的な校舎で学び、大学受験にとらわれずに部活や自分の好きな研究に全力投球します。",
    parent_summary: "【教育方針・進学】早稲田大学系属の名門共学校。ほぼ全生徒が早稲田大学の政経・法・理工・商などの主要学部へ内部推薦進学。受験勉強に追われることなく、幅広い教養と強靭な人間力を養えます。【環境・費用】国分寺駅徒歩7分。充実した教育施設とスポーツ環境。",
    child_summary: "憧れの早稲田大学にみんなで進学できる！受験のプレッシャーなしに、野球やサッカー、音楽や研究など、やりたいことに思いきり熱中できるよ！",
    tags: ["interest_sports_outdoor", "interest_history_culture", "interest_drawing_create"],
    interest_category_label: "早稲田大学直結・文武両道",
    is_favorite: false
  },
  {
    school_id: "sch_keio_chutobu",
    name: "慶應義塾中等部",
    name_ruby: "けいおうぎじゅくちゅうとうぶ",
    official_url: "https://www.kgc.keio.ac.jp/",
    catchphrase: "「独立自尊」。福澤諭吉の精神を受け継ぐ三田の杜の共学校",
    recommend_phrase: "★ 慶應義塾の誇りと自由を胸に、自立した個性的な仲間と伸び伸びと学校生活を楽しみたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "港区三田",
    station_name: "田町駅",
    access_info: {
      primary_line: "JR山手線・京浜東北線・都営浅草線・三田線",
      hub_station: "東京駅・品川駅・渋谷駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR田町駅徒歩10分、都営浅草線・三田線「三田駅」徒歩8分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（慶應義塾一貫教育）",
    commute_time: 25,
    tuition: 1100000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "attached",
    atmospheres: ["both", "arts"],
    vibe_label: "独立自尊・自由共学",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 96,
    recent_passed_records: "慶應義塾高校・慶應女子高校等を経て全員が慶應義塾大学各学部へ進学",
    events: [
      {
            "id": "ev_kc_1",
            "title": "中等部展覧会（文化祭）",
            "date": "10月25日(土)〜26日(日)",
            "type": "文化祭",
            "desc": "生徒一人ひとりの個性的な作品や研究が展示される伝統の展覧会！"
      }
],
    special_classes: [
      {
            "title": "福澤心訓と総合探究学習",
            "desc": "福澤諭吉の思想を学び、自ら課題を見つけて解決する独立自尊の学び！"
      }
],
    school_strengths: [
      "慶應義塾大学（医学部含む）への確実な内部進学ルート！",
      "三田の慶應義塾大学本部に隣接する都心最高峰のアカデミックな立地！",
      "男子も女子も互いの個性を尊重し合う自由で洗練された校風！"
],
    life_simulation: "田町・三田駅から慶應大学の赤レンガ図書館を眺めながら登校。自由でアットホームな教室で学び、放課後は部活や展覧会の準備に笑顔で取り組みます。",
    parent_summary: "【教育方針・進学】慶應義塾の共学中等教育機関。福澤諭吉の「独立自尊」のもと、豊かな個性と自主性を尊重。慶應義塾の一貫教育により、医学部を含む慶應義塾大学全学部への推薦進学が約束されています。【環境・費用】港区三田。国内最高峰のブランドと教育環境を誇ります。",
    child_summary: "慶應義塾大学のすぐお隣にあって、おしゃれで自由な雰囲気！制服も素敵で、優しい先生や一生の親友と一緒に楽しく大人へと成長できるよ！",
    tags: ["interest_history_culture", "interest_drawing_create", "interest_sports_outdoor"],
    interest_category_label: "慶應義塾一貫・独立自尊",
    is_favorite: false
  },
  {
    school_id: "sch_joshigakuin",
    name: "女子学院中学校",
    name_ruby: "じょしがくいんちゅうがっこう",
    official_url: "https://www.joshigakuin.ed.jp/",
    catchphrase: "自らを治める自由。プロテスタント精神と高い知性を育む女子御三家の名門",
    recommend_phrase: "★ 制服や細かな校則に縛られず、自分の意志で判断し、学問も議論も深く究めたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "千代田区一番町",
    station_name: "市ヶ谷駅",
    access_info: {
      primary_line: "JR総武線・東京メトロ有楽町線・南北線・都営新宿線",
      hub_station: "新宿駅・飯田橋駅・四ツ谷駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR・地下鉄各線「市ヶ谷駅」徒歩8分、有楽町線「麹町駅」徒歩3分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 920000,
    gender_type: "girls",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["academics", "arts"],
    vibe_label: "自主自立・キリスト教精神",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 97,
    recent_passed_records: "東京大学・京都大学・国公立医学部・早慶上理へ全国トップクラスの現役進学率",
    events: [
      {
            "id": "ev_jg_1",
            "title": "マグノリア祭（文化祭）",
            "date": "10月11日(土)〜13日(月)",
            "type": "文化祭",
            "desc": "生徒たちの知的な研究発表や熱い討論、演劇が光る女子学院最大の祭典！"
      }
],
    special_classes: [
      {
            "title": "聖書科＆リベラルアーツ探究ゼミ",
            "desc": "聖書の教えを通じて自己と他者を深く見つめ、社会問題の本質を問う授業！"
      }
],
    school_strengths: [
      "桜蔭・雙葉と並ぶ女子御三家の一角！圧倒的な難関国立大・医学部実績！",
      "制服がなく私服通学。自立した個性を育む「自由と責任」の伝統！",
      "千代田区一番町（市ヶ谷・麹町）の閑静で治安抜群の文教エリア！"
],
    life_simulation: "麹町・市ヶ谷駅から落ち着いた街並みを歩いて登校。毎朝の礼拝で心を落ち着かせた後、活発な意見が飛び交う授業に参加し、放課後は部活に熱中します。",
    parent_summary: "【教育方針・進学】女子御三家を代表するプロテスタント校。細かな規則を設けず「自らを治める自由」を重んじ、高い知性と社会貢献への責任感を育成。東大・医学部・難関国立大に抜群の現役合格実績を誇ります。【環境・費用】千代田区一番町の格式高い環境。",
    child_summary: "私服で通えるとても自由な女子校！自分の好きなファッションで通えて、何でも本音で語り合える一生の親友がたくさんできる素敵な学校だよ！",
    tags: ["interest_history_culture", "interest_puzzle_math", "interest_drawing_create"],
    interest_category_label: "自由自立・女子最高峰",
    is_favorite: false
  },
  {
    school_id: "sch_futaba",
    name: "雙葉中学校",
    name_ruby: "ふたばちゅうがっこう",
    official_url: "https://www.futabagakuen-jh.ed.jp/",
    catchphrase: "「徳においては純真に、義務においては堅実に」。気品と高い知性を育む女子御三家",
    recommend_phrase: "★ カトリックの温かい愛に包まれ、美しい言葉遣いと高い学力、確かな品性を身につけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "千代田区六番町",
    station_name: "四ツ谷駅",
    access_info: {
      primary_line: "JR中央線・総武線・東京メトロ丸ノ内線・南北線",
      hub_station: "新宿駅・東京駅・四ツ谷駅",
      walk_minutes: 2,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR・東京メトロ「四ツ谷駅」より徒歩2分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 930000,
    gender_type: "girls",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["academics", "arts"],
    vibe_label: "純真堅実・カトリック精神",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 96,
    recent_passed_records: "東京大学・国公立大学医学部・慶應義塾大学・早稲田大学へ多数合格",
    events: [
      {
            "id": "ev_futaba_1",
            "title": "雙葉祭（文化祭）",
            "date": "9月20日(土)〜21日(日)",
            "type": "文化祭",
            "desc": "伝統ある展示や美しい合唱、温かいおもてなしが息づく雙葉祭！"
      }
],
    special_classes: [
      {
            "title": "フランス語教育＆奉仕活動",
            "desc": "創立以来受け継がれるフランス語の学習と、他者のために尽くすボランティア！"
      }
],
    school_strengths: [
      "四ツ谷駅徒歩2分の圧倒的至便な立地と万全のセキュリティ！",
      "女子御三家の一角。少人数で行き届いた温かいカトリック教育と高い医学部実績！",
      "英語だけでなくフランス語も学べる格式高い語学教育！"
],
    life_simulation: "四ツ谷駅から歩いてすぐの校門へ。聖堂の鐘の音を聞きながら祈りを捧げ、きめ細かな授業で学問を深め、放課後はクラブ活動や聖歌隊の練習に励みます。",
    parent_summary: "【教育方針・進学】女子御三家を構成するカトリックの名門校。「徳においては純真に、義務においては堅実に」の校訓のもと、高い知性と品性を兼ね備えた女性を育成。東大・国公立医学部への安定した高い進学実績を築いています。【環境・費用】四ツ谷駅徒歩2分で通学安心。",
    child_summary: "四ツ谷駅の目の前にあるとてもキレイな学校！セーラー服が上品で、優しいお友達やシスターたちと一緒に温かい気持ちで楽しく過ごせるよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_puzzle_math"],
    interest_category_label: "品性・カトリック教育",
    is_favorite: false
  },
  {
    school_id: "sch_toshimagaoka",
    name: "豊島岡女子学園中学校",
    name_ruby: "としまがおかじょしがくえんちゅうがっこう",
    official_url: "https://www.toshimagaoka.ed.jp/",
    catchphrase: "「道義実践・勤勉努力・一能専心」。「運針」で集中力を磨き、理系・医学部へ飛躍する名門",
    recommend_phrase: "★ 毎日の努力を積み重ね、医学部や難関国立大に挑戦したい、目標に向かってひたむきに頑張りたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "豊島区東池袋",
    station_name: "池袋駅",
    access_info: {
      primary_line: "JR各線・東武東上線・西武池袋線・東京メトロ有楽町線",
      hub_station: "池袋駅",
      walk_minutes: 7,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "各線「池袋駅」東口徒歩7分、有楽町線「東池袋駅」徒歩1分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 950000,
    gender_type: "girls",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "stem"],
    vibe_label: "勤勉努力・理系医学部",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 97,
    recent_passed_records: "東京大学・国公立大学医学部・難関理系学部合格者数で全国女子校トップクラス",
    events: [
      {
            "id": "ev_toshima_1",
            "title": "桃李祭（文化祭）",
            "date": "10月4日(土)〜5日(日)",
            "type": "文化祭",
            "desc": "理科部やコーラス部など強豪クラブのハイレベルな展示・発表！"
      }
],
    special_classes: [
      {
            "title": "毎朝5分間の「運針」＆アカデミック・デイ",
            "desc": "無心になって白い布に針を通す集中力の訓練と、最先端の学術探究！"
      }
],
    school_strengths: [
      "東大合格者数および医学部現役合格実績で全国女子校トップを争う抜群の実績！",
      "池袋駅徒歩7分・東池袋駅徒歩1分のアクセス至便なキャンパス！",
      "コーラス部・マンドリン部・囲碁部など全国レベルの部活動が多数！"
],
    life_simulation: "池袋駅から歩いて登校。毎朝5分間の運針で心を整えてから集中して授業に臨み、放課後は部活に打ち込み、充実した自習室で勉強します。",
    parent_summary: "【教育方針・進学】女子トップクラスの進学実績を誇る完全中高一貫校。伝統の「運針」による集中力養成と、徹底した理数教育により、東大・国公立医学部に毎年圧倒的な合格者を輩出。面倒見の良さも抜群です。【環境・費用】池袋駅・東池袋駅から至近で通学至便。",
    child_summary: "毎朝みんなでチクチク針を縫う「運針」で集中力がつくよ！科学部や音楽系のクラブも全国トップクラスで、優しくて頑張り屋の友達がたくさんできるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_drawing_create"],
    interest_category_label: "理系医学部・勤勉努力",
    is_favorite: false
  },
  {
    school_id: "sch_aoyama_gakuin",
    name: "青山学院中等部",
    name_ruby: "あおやまがくいんちゅうとうぶ",
    official_url: "https://www.jh.aoyama.ed.jp/",
    catchphrase: "「地の塩、世の光」。渋谷の杜でキリスト教の愛と洗練された知性を育む伝統付属校",
    recommend_phrase: "★ 渋谷・表参道の素晴らしい環境で、青山学院大学進学を見据えながら多彩な文化・芸術活動を楽しみたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "渋谷区渋谷",
    station_name: "渋谷駅",
    access_info: {
      primary_line: "JR各線・東急東横線・田園都市線・東京メトロ半蔵門線・銀座線",
      hub_station: "渋谷駅・表参道駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "各線「渋谷駅」東口徒歩10分、地下鉄「表参道駅」B1出口徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高大一貫教育）",
    commute_time: 25,
    tuition: 1080000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "attached",
    atmospheres: ["both", "arts"],
    vibe_label: "地の塩世の光・洗練共学",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 95,
    recent_passed_records: "卒業生のほぼ全員が青山学院大学（各学部）へ進学、他大学進学枠も充実",
    events: [
      {
            "id": "ev_ag_1",
            "title": "中等部祭（文化祭）",
            "date": "10月18日(土)〜19日(日)",
            "type": "文化祭",
            "desc": "緑豊かな渋谷キャンパスで生徒が主役となって輝く華やかな学園祭！"
      }
],
    special_classes: [
      {
            "title": "キリスト教平和教育＆英語イマージョン",
            "desc": "毎日の礼拝とネイティブ教員による豊かなコミュニケーション授業！"
      }
],
    school_strengths: [
      "青山学院大学への確実な内部推薦進学ルート！",
      "渋谷・表参道という都心随一のトレンド・文化の発信地に位置するキャンパス！",
      "気品ある校風と高い英語力・グローバル教育！"
],
    life_simulation: "表参道や渋谷の街並みを歩いて緑豊かな青山キャンパスへ。チャペルでの賛美歌で一日を始め、英語や芸術の授業を楽しみ、放課後は部活に汗を流します。",
    parent_summary: "【教育方針・進学】「地の塩、世の光」をスクールモットーとするキリスト教名門共学校。ほぼ全員が青山学院大学へ進学可能。充実した英語教育と教養教育により、国際感覚と品格ある人格を育成します。【環境・費用】渋谷・表参道至近。都内随一の洗練された教育環境。",
    child_summary: "渋谷や表参道の近くにあるとってもキレイで緑がいっぱいの学校！英語の歌を歌ったり、部活動も行事もみんなで仲良く思いきり楽しめるよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_sports_outdoor"],
    interest_category_label: "青学一貫・国際教養",
    is_favorite: false
  },
  {
    school_id: "sch_asano",
    name: "浅野中学校",
    name_ruby: "あさのちゅうがっこう",
    official_url: "https://www.asano.ed.jp/",
    catchphrase: "「愛と和と誠実」「九転十起」。広大な緑の丘で文武両道を極める神奈川男子名門",
    recommend_phrase: "★ 広大なグラウンドで部活動に打ち込みながら、東大・難関国立大を本気で目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "横浜市神奈川区子安台",
    station_name: "新子安駅",
    access_info: {
      primary_line: "JR京浜東北線・京急本線",
      hub_station: "横浜駅・川崎駅・品川駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR京浜東北線「新子安駅」・京急新子安駅より徒歩8分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 920000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "文武両道・質実剛健",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 67,
    match_rate_child: 96,
    recent_passed_records: "東京大学・東京工業大学・国公立大学医学部に毎年多数の現役合格（東大合格40名前後）",
    events: [
      {
            "id": "ev_asano_1",
            "title": "打越祭（文化祭）",
            "date": "9月20日(土)〜21日(日)",
            "type": "文化祭",
            "desc": "打越の丘が熱気に包まれる男子校ならではの活気ある文化祭！"
      }
],
    special_classes: [
      {
            "title": "浅野サイエンス探究＆広大な銅像山フィールドワーク",
            "desc": "校内の豊かな自然林「銅像山」を活用した地学・生物の体験型学習！"
      }
],
    school_strengths: [
      "神奈川男子御三家（聖光・栄光・浅野）の一角。抜群の東大・難関国立大合格実績！",
      "新子安駅徒歩8分の至近アクセス！品川・横浜から10分圏内！",
      "敷地内に広大な自然林（銅像山）と全面人工芝グラウンドを備えた贅沢な環境！"
],
    life_simulation: "新子安駅から坂を登って広大な緑の丘へ。午前は集中して授業を受け、午後は人工芝グラウンドで仲間と部活に励み、放課後は自習室で勉強します。",
    parent_summary: "【教育方針・進学】神奈川男子御三家の代表校。「文武両道」を徹底実践し、ほぼ全生徒が運動部・文化部に所属しながら東大・難関国立大へ高い現役合格率を誇ります。面倒見の良い指導にも定評があります。【環境・費用】新子安駅徒歩8分。緑豊かな高台に位置し環境抜群。",
    child_summary: "緑の山が丸ごと学校の中に！サッカー場や野球場も広くて、思い切り走って部活をしながら、勉強もどんどん得意になれるかっこいい学校だよ！",
    tags: ["interest_sports_outdoor", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "文武両道・男子御三家",
    is_favorite: false
  },
  {
    school_id: "sch_nishiyamato",
    name: "西大和学園中学校",
    name_ruby: "にしやまとがくえんちゅうがっこう",
    official_url: "https://www.nishiyamato.ed.jp/",
    catchphrase: "「探究・挑戦・飛躍」。次代を担うリーダーを育てる日本屈指の最難関共学校",
    recommend_phrase: "★ 全国から集まるハイレベルな仲間と切磋琢磨し、東大・京大・海外大を目指して圧倒的に成長したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "奈良県",
    district: "北葛城郡河合町薬井",
    station_name: "王寺駅",
    access_info: {
      primary_line: "近鉄田原本線・JR大和路線",
      hub_station: "天王寺駅・大阪駅・奈良駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: true,
      school_bus_note: "近鉄大輪田駅徒歩5分、JR王寺駅より直通スクールバス約10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 35,
    tuition: 960000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "知的好奇心・圧倒的進学力",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 71,
    match_rate_child: 98,
    recent_passed_records: "東京大学・京都大学・国公立医学部合計200名超（東大合格者数全国トップ3常連）",
    events: [
      {
            "id": "ev_ny_1",
            "title": "青雲祭（文化祭）",
            "date": "9月6日(土)〜7日(日)",
            "type": "文化祭",
            "desc": "全国から生徒が集う西大和のエネルギーが大爆発する大文化祭！"
      }
],
    special_classes: [
      {
            "title": "アクションプロジェクト＆海外探究プログラム",
            "desc": "模擬国連への挑戦や国内外の第一線で活躍するリーダーとの対話セッション！"
      }
],
    school_strengths: [
      "東大・京大・国公立大医学部合格者数で全国屈指の実績！",
      "全国から志高い生徒が集う充実した学生寮を完備！",
      "大阪・奈良・京都から好アクセスの立地とスクールバス運行！"
],
    life_simulation: "王寺駅からのスクールバスや大輪田駅から登校。高い意欲を持つ仲間たちと最先端の講義を受け、放課後は夜間学習支援や部活動で高め合います。",
    parent_summary: "【教育方針・進学】関西のみならず全国屈指の進学校。手厚い学習指導体制と先進的な探究・国際教育により、東大・京大・国公立医学部合格者数で全国トップを争う実績を達成。寮も完備し全国から受検生が集まります。【環境・費用】大輪田駅徒歩5分、王寺駅から直通バス。",
    child_summary: "全国から一番頭が良くて元気な友達が集まってくる！海外研修や面白い実験、模擬国連など、世界で活躍するためのすごい体験がたくさんできるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_history_culture"],
    interest_category_label: "全国最難関・世界探究",
    is_favorite: false
  },
  {
    school_id: "sch_koyo_gakuin",
    name: "甲陽学院中学校",
    name_ruby: "こうようがくいんちゅうがっこう",
    official_url: "https://www.koyo.ac.jp/",
    catchphrase: "「明朗・友愛・剛健」。美しい六甲の麓で深い思索と学問を極める関西男子名門",
    recommend_phrase: "★ 灘と並び称される関西最高峰の環境で、数学や科学、文学の真理をとことん追究したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "兵庫県",
    district: "西宮市中葭原町",
    station_name: "香櫨園駅",
    access_info: {
      primary_line: "阪神本線・JR神戸線・阪急神戸線",
      hub_station: "大阪（梅田）駅・三ノ宮駅",
      walk_minutes: 7,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "阪神本線「香櫨園駅」より徒歩7分、JR「さくら夙川駅」徒歩12分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 920000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "stem"],
    vibe_label: "学問探究・気風明朗",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 70,
    match_rate_child: 97,
    recent_passed_records: "東京大学・京都大学・国公立大学医学部に毎年圧倒的な合格実績",
    events: [
      {
            "id": "ev_koyo_1",
            "title": "音楽祭＆文化発表会",
            "date": "10月25日(土)",
            "type": "文化祭",
            "desc": "学問と芸術を愛する甲陽生による洗練された発表会！"
      }
],
    special_classes: [
      {
            "title": "高度数理科学ゼミ＆教養講座",
            "desc": "大学入試の枠を超え、学問の根本原理を思考する独自の少人数ゼミ！"
      }
],
    school_strengths: [
      "灘・東大寺と並ぶ関西男子御三家の最高峰！",
      "東大・京大・国公立医学部への現役進学率が極めて高い！",
      "西宮・香櫨園の閑静で気品ある夙川文教エリアに位置！"
],
    life_simulation: "香櫨園駅から夙川のせせらぎ沿いを歩いて登校。質の高い授業と仲間同士の深い議論を楽しみ、放課後は部活や図書室で思い思いに研鑽を積みます。",
    parent_summary: "【教育方針・進学】関西男子最難関の一角。自由で明るい校風の中、本質的な学問指導を行い、京大・東大・国公立医学部へ圧倒的な進学成果を誇ります。中学と高校でキャンパスが分かれ、発達段階に応じた教育を展開。【環境・費用】西宮市香櫨園の極めて閑静な環境。",
    child_summary: "夙川のキレイな川のそばにあって、算数や理科が大好きな天才肌の友達がたくさん！面白い研究やスポーツを仲間と一緒に楽しもう！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_nature_biology"],
    interest_category_label: "真理探究・関西最難関",
    is_favorite: false
  },
  {
    school_id: "sch_kobe_jogakuin",
    name: "神戸女学院中学部",
    name_ruby: "こうべじょがくいんちゅうがくぶ",
    official_url: "https://www.kobe-c.ac.jp/",
    catchphrase: "「愛神愛隣」。ヴォーリズ建築の重要文化財キャンパスで真の自由と知性を育む",
    recommend_phrase: "★ 西日本屈指の美しいキャンパスで、キリスト教の愛と深い教養を学び、豊かな自立した女性になりたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "兵庫県",
    district: "西宮市岡田山",
    station_name: "門戸厄神駅",
    access_info: {
      primary_line: "阪急今津線",
      hub_station: "西宮北口駅・大阪梅田駅・神戸三宮駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "阪急今津線「門戸厄神駅」より徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 950000,
    gender_type: "girls",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["academics", "arts"],
    vibe_label: "真の自由・キリスト教精神",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 68,
    match_rate_child: 96,
    recent_passed_records: "東京大学・京都大学・大阪大学・国公立大学医学部に多数合格（関西女子最高峰）",
    events: [
      {
            "id": "ev_kj_1",
            "title": "愛校祭（文化祭）",
            "date": "10月24日(金)〜25日(土)",
            "type": "文化祭",
            "desc": "重要文化財の講堂や校舎で開催される品格と熱意あふれる愛校祭！"
      }
],
    special_classes: [
      {
            "title": "英語プロテスタント教育＆リベラルアーツ",
            "desc": "140年の伝統を誇る少人数英語教育と、全人格的な教養プログラム！"
      }
],
    school_strengths: [
      "国の重要文化財に指定されたヴォーリズ建築の比類なき美しい学び舎！",
      "関西女子最難関として京大・阪大・医学部に高い合格率！",
      "西宮北口至近の門戸厄神駅から徒歩10分の通学至便環境！"
],
    life_simulation: "門戸厄神駅から岡田山の木立を登って登校。スパニッシュ・ミッション様式の美しい校舎で心静かに礼拝を守り、知的好奇心に満ちた授業を受けます。",
    parent_summary: "【教育方針・進学】関西女子最難関の伝統プロテスタント校。合格者数を公表しない独自の方針を貫きながらも、京大・阪大・国公立医学部に毎年多数の現役進学者を輩出。全人教育の最高峰です。【環境・費用】西宮市岡田山の緑深い丘の上に広がる重要文化財キャンパス。",
    child_summary: "まるで映画やお城のような美しい洋館の学校！お庭には四季折々の花が咲き、英語も音楽も勉強も、優しくて素敵な友達と一緒に学べるよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_nature_biology"],
    interest_category_label: "歴史建築・全人教育",
    is_favorite: false
  },
  {
    school_id: "sch_shitennouji",
    name: "四天王寺中学校",
    name_ruby: "してんのうじちゅうがっこう",
    official_url: "https://www.shitennoji.ed.jp/stnnj/",
    catchphrase: "聖徳太子の和の精神。圧倒的な医学部合格実績を誇る関西女子の最高峰進学校",
    recommend_phrase: "★ 医学部や最難関国公立大学を目指し、高い志を持つ仲間とともに確かな学力を身につけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "大阪府",
    district: "大阪市天王寺区四天王寺",
    station_name: "四天王寺前夕陽ヶ丘駅",
    access_info: {
      primary_line: "大阪メトロ谷町線・JR各線・近鉄線",
      hub_station: "天王寺駅・東梅田駅・大阪阿部野橋駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "大阪メトロ谷町線「四天王寺前夕陽ヶ丘駅」徒歩5分、各線「天王寺駅」徒歩10分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "医志コース・英数Sコース・英数コース",
    commute_time: 25,
    tuition: 950000,
    gender_type: "girls",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "和の精神・医学部難関大",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 67,
    match_rate_child: 96,
    recent_passed_records: "国公立大学医学部医学科合格者数で全国屈指（毎年60名前後が医学部に合格）",
    events: [
      {
            "id": "ev_shiten_1",
            "title": "四天王寺学園祭",
            "date": "9月20日(土)〜21日(日)",
            "type": "文化祭",
            "desc": "活気あるクラブ展示やダンス・演劇発表が盛り上がる大イベント！"
      }
],
    special_classes: [
      {
            "title": "医志コース特別プログラム＆聖徳太子和の教育",
            "desc": "現役医師・先端医学研究者による特別講義と最先端の医療体験！"
      }
],
    school_strengths: [
      "全国トップクラスの国公立大医学部合格実績を誇る「医志コース」！",
      "聖徳太子創建の四天王寺境内に隣接する1400年の歴史が息づく文教立地！",
      "天王寺駅・夕陽ヶ丘駅徒歩圏で大阪・奈良・和歌山から抜群の通学アクセス！"
],
    life_simulation: "夕陽ヶ丘駅から四天王寺の厳かな参道を歩いて登校。高い目標を掲げる仲間と切磋琢磨し、放課後はクラブ活動や手厚い補習・自習ブースで勉強します。",
    parent_summary: "【教育方針・進学】聖徳太子の教えを礎とする関西女子の巨頭。「医志コース」をはじめ、国公立大学医学部医学科への合格者数は全国トップクラス。難関大入試に向けた徹底した個別進路指導が高く評価されています。【環境・費用】天王寺エリア至近で通学至便。",
    child_summary: "将来お医者さんや科学者になりたい人にぴったりの学校！同じ夢を持つ頼もしい友達がたくさんいて、勉強も行事も全力で支え合えるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_history_culture"],
    interest_category_label: "医学部特化・和の教養",
    is_favorite: false
  },
  {
    school_id: "sch_aichi_shukutoku",
    name: "愛知淑徳中学校",
    name_ruby: "あいちしゅくとくちゅうがっこう",
    official_url: "http://www.aichishukutoku-h.jp/",
    catchphrase: "「淑徳の精神」。名古屋の文教地区・星ヶ丘で自立した女性の知性と品格を育む",
    recommend_phrase: "★ 東海地区屈指の伝統校で、文武両道の伸びやかな環境の中で国公立・難関私大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "愛知県",
    district: "名古屋市千種区星が丘元町",
    station_name: "星ヶ丘駅",
    access_info: {
      primary_line: "名古屋市営地下鉄東山線",
      hub_station: "名古屋駅・栄駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄東山線「星ヶ丘駅」門号出口より徒歩5分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 890000,
    gender_type: "girls",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "品格知性・文武両道",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "名古屋大学・名古屋市立大学・名城大薬学部・早慶上理などへ高い合格率",
    events: [
      {
            "id": "ev_shukutoku_1",
            "title": "淑徳祭（文化祭）",
            "date": "9月20日(土)",
            "type": "文化祭",
            "desc": "生徒主体の展示や華やかなクラブ公演が彩る伝統の学園祭！"
      }
],
    special_classes: [
      {
            "title": "淑徳グローバル探究＆キャリアセミナー",
            "desc": "女性のキャリア自立を見据えた多彩なフィールドワークと講演会！"
      }
],
    school_strengths: [
      "名古屋地下鉄東山線「星ヶ丘駅」徒歩5分の好立地と洗練された文教エリア！",
      "南山女子と並ぶ東海地区女子トップクラスの進学校！",
      "大学受験に向けた丁寧な習熟度別指導とアットホームな校風！"
],
    life_simulation: "人気の星ヶ丘駅から歩いて5分。明るく開放的な校舎で友人と語り合い、午後は実験や探究学習、放課後は部活や自習に充実した日々を送ります。",
    parent_summary: "【教育方針・進学】創立120年近い歴史を持つ東海地区屈指の名門女子進学校。名大をはじめとする難関国公立大学や医学部・薬学部への進学実績が極めて高く、生徒の進路希望に応える面倒見の良い指導が評判です。【環境・費用】星ヶ丘駅徒歩5分で治安も良好。",
    child_summary: "星ヶ丘のおしゃれで緑豊かな街にあって通いやすい！先輩たちがとても優しく、勉強も部活動も行事もみんなで仲良く楽しめる温かい学校だよ！",
    tags: ["interest_history_culture", "interest_drawing_create", "interest_puzzle_math"],
    interest_category_label: "品格知性・東海女子",
    is_favorite: false
  },
  {
    school_id: "sch_adachi_gakuen",
    name: "足立学園中学校",
    name_ruby: "あだちがくえんちゅうがっこう",
    official_url: "https://www.adachigakuen-jh.ed.jp/",
    catchphrase: "「志ある逞しい男子」を育む。北千住駅徒歩1分の温かい教育と抜群の進学伸長力",
    recommend_phrase: "★ 交通至便な環境で男子校ならではの活気に満ち、勉強も部活動も先生の手厚いサポートを受けたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "足立区千住旭町",
    station_name: "北千住駅",
    access_info: {
      primary_line: "JR常磐線・東京メトロ日比谷線・千代田線・東武スカイツリーライン・つくばエクスプレス",
      hub_station: "上野駅・大手町駅・秋葉原駅",
      walk_minutes: 1,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "各線「北千住駅」東口（電大口）より徒歩1分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "特別奨学生コース・文理コース",
    commute_time: 20,
    tuition: 850000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "面倒見・情熱男子教育",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 54,
    match_rate_child: 92,
    recent_passed_records: "東京大学・国公立大学・早慶上理・GMARCHへ合格者数急伸中",
    events: [
      {
            "id": "ev_adachi_1",
            "title": "学園祭（志学祭）",
            "date": "9月27日(土)〜28日(日)",
            "type": "文化祭",
            "desc": "男子校のパワー炸裂！柔道部演武やクラス企画が盛り上がります。"
      }
],
    special_classes: [
      {
            "title": "志探究プログラム＆放課後校内予備校",
            "desc": "校内で夜間まで自習・質問ができる手厚い学習支援体制！"
      }
],
    school_strengths: [
      "北千住駅東口徒歩1分！雨でも濡れずに通える圧倒的利便性！",
      "入学後の学力伸長度（お得な学校ランキング）で常に上位評価！",
      "柔道部をはじめ全国レベルの部活動と男子の成長に合わせたきめ細かな指導！"
],
    life_simulation: "北千住駅から徒歩1分で校舎へ。先生と気兼ねなく質問できるアットホームな環境で学び、放課後は部活や校内の夜間学習で仲間と頑張ります。",
    parent_summary: "【教育方針・進学】「志ある逞しい男子」を育成する男子校。入学時の学力からの伸長度が極めて高く、東大・難関国公立大・早慶への進学実績が躍進中。校内予備校や手厚い補習体制が保護者から絶大な信頼を得ています。【環境・費用】北千住駅徒歩1分で通学安心。",
    child_summary: "駅から歩いてすぐ！先生たちがとっても熱心で、勉強の質問も優しく教えてくれるよ！柔道やサッカーなどの部活動も大盛り上がり！",
    tags: ["interest_sports_outdoor", "interest_puzzle_math", "interest_history_culture"],
    interest_category_label: "駅前至便・面倒見男子校",
    is_favorite: false
  },
  {
    school_id: "sch_atomi_gakuen",
    name: "跡見学園中学校",
    name_ruby: "あとみがくえんちゅうがっこう",
    official_url: "https://www.atomi.ac.jp/jh/",
    catchphrase: "日本最古の私立女子校。「ごきげんよう」の挨拶と伝統の「跡見の桜」が息づく文京の学び舎",
    recommend_phrase: "★ 日本の伝統文化や礼儀作法を大切にし、穏やかで気品ある環境で女性のキャリアを切り拓きたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "文京区大塚",
    station_name: "茗荷谷駅",
    access_info: {
      primary_line: "東京メトロ丸ノ内線・有楽町線",
      hub_station: "池袋駅・東京駅",
      walk_minutes: 2,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東京メトロ丸ノ内線「茗荷谷駅」徒歩2分、有楽町線「護国寺駅」徒歩8分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "特進コース・進学コース",
    commute_time: 20,
    tuition: 890000,
    gender_type: "girls",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["arts", "academics"],
    vibe_label: "伝統気品・情操教育",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 52,
    match_rate_child: 90,
    recent_passed_records: "国公立大学・早慶上理・GMARCH・跡見学園女子大学など堅実な合格実績",
    events: [
      {
            "id": "ev_atomi_1",
            "title": "紫祭（文化祭）",
            "date": "10月11日(土)〜12日(日)",
            "type": "文化祭",
            "desc": "和太鼓や器楽、華道・茶道の優美な展示・公演！"
      }
],
    special_classes: [
      {
            "title": "書道・礼法・文化講座",
            "desc": "美しい文字と所作を身につけ、内面から凛とした女性を育てる伝統教育！"
      }
],
    school_strengths: [
      "丸ノ内線茗荷谷駅徒歩2分、文教の街・文京区の落ち着いた治安最高の環境！",
      "明治8年創立、日本最古の私立女子校としての揺るぎない品格と歴史！",
      "手厚い進路指導と特進クラス導入による大学進学実績の向上！"
],
    life_simulation: "茗荷谷駅から歩いてすぐ。桜の紋章が掲げられた校舎で「ごきげんよう」の挨拶を交わし、落ち着いた教室で丁寧な授業を受けます。",
    parent_summary: "【教育方針・進学】1875年創立の日本最初の私立女子校。伝統の礼儀作法と書道・情操教育を土台に、現代社会で活躍する自立した女性を育成。近年は特進クラスを設置し難関大への現役進学にも力を注いでいます。【環境・費用】文京区茗荷谷駅徒歩2分。",
    child_summary: "「ごきげんよう」と挨拶を交わす、とても優しくて上品な学校！きれいな校舎でお茶や書道を学んだり、お友達と楽しく過ごせるよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_nature_biology"],
    interest_category_label: "伝統女子・情操礼儀",
    is_favorite: false
  },
  {
    school_id: "sch_aoyama_yokohama_eiwa",
    name: "青山学院横浜英和中学高等学校",
    name_ruby: "あおやまがくいんよこはまえいわちゅうがくこうとうがっこう",
    official_url: "https://www.yokohama-eiwa.ac.jp/jh/",
    catchphrase: "「心を尽くし、思いを尽くして愛せよ」。緑の丘で青山学院大学への進学と豊かな心を育む",
    recommend_phrase: "★ 青山学院大学への進学を見据え、温かいキリスト教精神のもとで英語や豊かな人間性を身につけたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "横浜市南区蒔田町",
    station_name: "蒔田駅",
    access_info: {
      primary_line: "横浜市営地下鉄ブルーライン・京急本線",
      hub_station: "横浜駅・上大岡駅",
      walk_minutes: 8,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "市営地下鉄ブルーライン「蒔田駅」徒歩8分、京急「井土ヶ谷駅」徒歩18分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（青山学院大学系属共学校）",
    commute_time: 25,
    tuition: 980000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "attached",
    atmospheres: ["both", "arts"],
    vibe_label: "キリスト教愛・共学共生",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 94,
    recent_passed_records: "卒業生の約70%以上が青山学院大学へ推薦進学、他大学進学実績も伸長",
    events: [
      {
            "id": "ev_eiwa_1",
            "title": "英和祭（文化祭）",
            "date": "10月25日(土)〜26日(日)",
            "type": "文化祭",
            "desc": "緑豊かな丘の上のキャンパスで生徒が笑顔で輝く学園祭！"
      }
],
    special_classes: [
      {
            "title": "青山学院大学連携教育＆礼拝体験",
            "desc": "大学の教授陣による出張講義や、豊かな情操を育むキリスト教教育！"
      }
],
    school_strengths: [
      "青山学院大学への充実した系属校推薦枠（約70%）！",
      "共学化と新校舎完成により明るく活気あふれるスクールライフ！",
      "蒔田駅徒歩8分で横浜・桜木町方面からの通学が快適！"
],
    life_simulation: "蒔田駅から坂を登って緑の丘へ。チャペルの礼拝で一日を始め、英語やグループワークに熱中し、放課後は部活動やカフェテリアで仲間と交流します。",
    parent_summary: "【教育方針・進学】青山学院大学の系属校として高い人気を集める共学校。卒業生の約7割が青山学院大学へ推薦進学できる安心感のもと、豊かな人間教育と高度な英語教育を展開しています。【環境・費用】横浜市南区の丘の上に広がる開放的なキャンパス。",
    child_summary: "青学（青山学院大学）に行ける人気の学校！キレイなチャペルやカフェテリアがあって、男の子も女の子もみんな仲良しだよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_sports_outdoor"],
    interest_category_label: "青山学院系属・共学英和",
    is_favorite: false
  },
  {
    school_id: "sch_urawa_lutheran",
    name: "青山学院大学系属浦和ルーテル学院中学校",
    name_ruby: "あおやまがくいんだいがくけいぞくうらわるーてるがくいんちゅうがっこう",
    official_url: "https://www.uls.ed.jp/",
    catchphrase: "「神を愛し、人を愛し、自己を愛する」。少人数教育で青山学院大へ進学する緑の美園キャンパス",
    recommend_phrase: "★ アットホームな少人数指導で一人ひとり手厚く見守られ、青山学院大学への進学を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "埼玉県",
    district: "さいたま市緑区大門",
    station_name: "浦和美園駅",
    access_info: {
      primary_line: "埼玉高速鉄道・JR武蔵野線",
      hub_station: "東川口駅・浦和美園駅",
      walk_minutes: 15,
      bus_minutes: 5,
      school_bus: true,
      school_bus_note: "浦和美園駅徒歩15分、東川口駅・浦和美園駅よりスクールバス運行"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（12年一貫・青山学院大学系属）",
    commute_time: 30,
    tuition: 980000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "attached",
    atmospheres: ["academics", "arts"],
    vibe_label: "少人数温情・青学連携",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 92,
    recent_passed_records: "希望者のほぼ全員が青山学院大学への推薦進学基準を満たす手厚い体制",
    events: [
      {
            "id": "ev_lutheran_1",
            "title": "クリスマス礼拝＆オープンキャンパス",
            "date": "11月15日(土)",
            "type": "学校説明会",
            "desc": "少人数教育の温かさと青学推薦制度を詳しく解説します。"
      }
],
    special_classes: [
      {
            "title": "ギフト教育＆バイリンガルイングリッシュ",
            "desc": "神から与えられた一人ひとりの才能（ギフト）を伸ばす少人数ゼミ！"
      }
],
    school_strengths: [
      "青山学院大学へのほぼ全員規模の系属校進学ルート！",
      "1学年少人数の家族的な温かい教育環境と確実な目配り！",
      "浦和美園・東川口駅からのスクールバスで快適アクセス！"
],
    life_simulation: "スクールバスで緑豊かな美園キャンパスへ。1クラス少人数で先生との距離が非常に近く、放課後は部活や個別指導で安心して過ごせます。",
    parent_summary: "【教育方針・進学】青山学院大学の系属校。少人数編成を活かしたきめ細かな「ギフト教育」により、一人ひとりの個性と学力を確実に伸ばし、青山学院大学各学部への進学が可能です。【環境・費用】さいたま市緑区。広大な自然と美しい校舎が調和しています。",
    child_summary: "先生が一人ひとりをすごく大切にしてくれる温かい学校！クラスのみんなと家族みたいに仲良くなれて、青学への道もひらけているよ！",
    tags: ["interest_drawing_create", "interest_nature_biology", "interest_history_culture"],
    interest_category_label: "少人数・青学系属",
    is_favorite: false
  },
  {
    school_id: "sch_meiden",
    name: "愛知工業大学名電中学校",
    name_ruby: "あいちこうぎょうだいがくめいでんちゅうがっこう",
    official_url: "https://www.meiden.ed.jp/",
    catchphrase: "「誠実・勤勉・親愛」。ロボット・サイエンス教育と全国屈指の部活動が躍動する名古屋の名門",
    recommend_phrase: "★ 先端のロボットコンテストや科学実験に打ち込み、吹奏楽やスポーツでも全国を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "愛知県",
    district: "名古屋市千種区若水",
    station_name: "自由ヶ丘駅",
    access_info: {
      primary_line: "名古屋市営地下鉄名城線・東山線",
      hub_station: "名古屋駅・栄駅・本山駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄名城線「自由ヶ丘駅」徒歩10分、東山線「池下駅」徒歩15分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫コース）",
    commute_time: 25,
    tuition: 870000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "both"],
    vibe_label: "ものづくり・文武両道",
    club_label: "極めて活発",
    record_label: "◎",
    deviation_score: 57,
    match_rate_child: 93,
    recent_passed_records: "国公立大学・愛知工業大学・難関理系学部へ多数進学",
    events: [
      {
            "id": "ev_meiden_1",
            "title": "ロボット工作フェスタ＆説明会",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "名電伝統のロボット製作やプログラミングを体験できます。"
      }
],
    special_classes: [
      {
            "title": "ロボットサイエンス探究＆先端プログラミング",
            "desc": "世界大会を目指すロボット研究とAIプログラミングの実践授業！"
      }
],
    school_strengths: [
      "ロボットコンテスト世界大会出場常連！ものづくり教育の最高峰！",
      "全国金賞の吹奏楽部やプロ野球選手を多数輩出した名門スポーツ部！",
      "愛知工大への内部進学と難関国公立大学進学を両立！"
],
    life_simulation: "自由ヶ丘駅から歩いて登校。実験室でロボットやプログラムの試作に熱中し、放課後は大迫力の吹奏楽や部活動で仲間と高みを目指します。",
    parent_summary: "【教育方針・進学】「名電」の名で全国に轟く伝統校。理数・ものづくり教育に特化した中高一貫指導を行い、愛知工大への推薦枠を活かしつつ国公立大・難関私大理系への進学実績を伸ばしています。【環境・費用】名古屋市千種区の住宅街に位置。",
    child_summary: "ロボットを作って世界大会に出られるすごい学校！全国金賞の吹奏楽部や野球・卓球など、部活動のレベルも日本一クラスで熱いよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_sports_outdoor"],
    interest_category_label: "ロボット技術・ものづくり",
    is_favorite: false
  },
  {
    school_id: "sch_assumption",
    name: "アサンプション国際中学校",
    name_ruby: "あさんぷしょんこくさいちゅうがっこう",
    official_url: "https://www.assumption.ed.jp/jhs/",
    catchphrase: "21世紀型グローバル教育。英語イマージョンとPBL探究で未来を拓く箕面の国際校",
    recommend_phrase: "★ ネイティブ教員と英語で学び、国際バカロレアや海外大学・難関私大進学を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "大阪府",
    district: "箕面市如意谷",
    station_name: "箕面萱野駅",
    access_info: {
      primary_line: "北大阪急行電鉄（御堂筋線直通）・阪急箕面線",
      hub_station: "梅田駅・千里中央駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: true,
      school_bus_note: "北大阪急行「箕面萱野駅」徒歩10分、千里中央駅等よりスクールバス運行"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "グローバルコース・イングリッシュコース・アカデミックコース",
    commute_time: 30,
    tuition: 950000,
    gender_type: "coed",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["arts", "academics"],
    vibe_label: "英語イマージョン・探究共学",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 56,
    match_rate_child: 92,
    recent_passed_records: "国公立大学・関関同立・上智大・海外大学などへの進学実績急上昇",
    events: [
      {
            "id": "ev_asum_1",
            "title": "イマージョン体験フェス",
            "date": "10月25日(土)",
            "type": "学校説明会",
            "desc": "ネイティブ教員による英語での理科・算数体験授業！"
      }
],
    special_classes: [
      {
            "title": "英語イマージョン授業＆PBL（課題解決型学習）",
            "desc": "算数や理科を英語で学び、世界規模の社会課題をチームで解決！"
      }
],
    school_strengths: [
      "北大阪急行「箕面萱野駅」延伸開業により梅田から直通でアクセス飛躍！",
      "算数・理科などを英語で学ぶ本格的イマージョン教育！",
      "カトリックの温かな全人教育と海外大学への推薦パスウェイ！"
],
    life_simulation: "新駅・箕面萱野駅から緑豊かな並木道を歩いて登校。ネイティブの先生と英語で談笑し、課題解決プロジェクトに熱中します。",
    parent_summary: "【教育方針・進学】カトリック聖母被昇天修道会を母体とする共学国際校。英語イマージョン教育や探究PBLを導入し、国内外の難関大学への進学実績を伸ばしています。北大阪急行延伸で通学利便性が大幅に向上しました。【環境・費用】箕面市の緑豊かな高級住宅街。",
    child_summary: "箕面萱野駅ができて通いやすさ抜群！英語で理科や図工の実験をしたり、外国の先生と友達みたいにお話しできる楽しい学校だよ！",
    tags: ["interest_drawing_create", "interest_nature_biology", "interest_history_culture"],
    interest_category_label: "英語イマージョン・国際共学",
    is_favorite: false
  },
  {
    school_id: "sch_hiratsuka_chuto",
    name: "神奈川県立平塚中等教育学校",
    name_ruby: "かながわけんりつひらつかちゅうとうきょういくがっこう",
    official_url: "https://www.pen-kanagawa.ed.jp/hiratsuka-chuto-ss/",
    catchphrase: "「自主自律・共生」。湘南の風薫るキャンパスで世界に発信する探究力を磨く",
    recommend_phrase: "★ 湘南エリアで伸び伸びと学び、仲間とともに課題解決型の探究学習を深めたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "平塚市大東町",
    station_name: "平塚駅",
    access_info: {
      primary_line: "JR東海道線・上野東京ライン・湘南新宿ライン",
      hub_station: "横浜駅・茅ヶ崎駅・小田原駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "JR「平塚駅」北口より路線バス約10分「平塚中等教育学校」下車すぐ"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "湘南自由・探究共生",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 92,
    recent_passed_records: "東京大・横浜国立大・早慶上理などへ安定した難関大進学実績",
    events: [
      {
            "id": "ev_hira_1",
            "title": "学校説明会・公開授業",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "6年間のキャリア探究プログラムと学校生活を紹介します。"
      }
],
    special_classes: [
      {
            "title": "平塚探究プレゼンテーション",
            "desc": "湘南の地域課題や海洋環境を自らテーマ設定し、深く調査・発表する授業！"
      }
],
    school_strengths: [
      "神奈川県立2大中等教育学校の一翼を担う安定した一貫教育体制！",
      "湘南の温暖で広々としたキャンパスと充実した体育・文化設備！",
      "公立校のため学費負担なく6年間のハイレベル教育を完結！"
],
    life_simulation: "平塚駅からバスですぐ登校。広大な敷地で探究活動やグループワークを楽しみ、放課後は部活動に熱中し、自習室で勉強します。",
    parent_summary: "【教育方針・進学】神奈川県が設置する中等教育学校。相模原中等と並び、公立一貫校ならではの低負担と高い進学実績を両立。東大・横国大・早慶等に堅実な合格者を送り出しています。【環境・費用】平塚市。公立のため授業料無償です。",
    child_summary: "敷地が広くてとても気持ちいい学校！海の近くで自然も豊か、探究の発表会や体育祭もみんなで本気で盛り上がるよ！",
    tags: ["interest_nature_biology", "interest_sports_outdoor", "interest_puzzle_math"],
    interest_category_label: "湘南探究・自立共生",
    is_favorite: false
  },
  {
    school_id: "sch_kawasaki_fuzoku",
    name: "川崎市立川崎高等学校附属中学校",
    name_ruby: "かわさきしりつかわさきこうとうがっこうふぞくちゅうがっこう",
    official_url: "http://www.kaw-s.ed.jp/jh-school/",
    catchphrase: "「自立・協働・創造」。川崎の多様性と産業の力を活かす公立中高一貫校",
    recommend_phrase: "★ 川崎の最先端科学や多文化共生を学び、将来グローバルに活躍したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "川崎市川崎区中島",
    station_name: "川崎駅",
    access_info: {
      primary_line: "JR東海道線・京浜東北線・南武線・京急本線",
      hub_station: "品川駅・横浜駅・武蔵小杉駅",
      walk_minutes: 15,
      bus_minutes: 5,
      school_bus: false,
      school_bus_note: "JR「川崎駅」東口より徒歩15分、または臨港バス5分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "stem"],
    vibe_label: "多文化共生・先端産業探究",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 91,
    recent_passed_records: "東京工業大・横浜国立大・筑波大・GMARCHなどへ現役合格多数",
    events: [
      {
            "id": "ev_kaw_1",
            "title": "学校説明会",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "川崎独自の産学連携探究と6年一貫指導の成果を公開します。"
      }
],
    special_classes: [
      {
            "title": "川崎イノベーション探究",
            "desc": "殿町国際戦略拠点（キングスカイフロント）等と連携した最先端生命科学学習！"
      }
],
    school_strengths: [
      "巨大ターミナル川崎駅からの至近アクセス！品川・横浜から好立地！",
      "キングスカイフロント等の研究機関と連携した高度な科学・産業探究！",
      "公立校のため学費無償で手厚い進学サポート体制！"
],
    life_simulation: "川崎駅から歩いて登校。先端企業の研究者から直接話を聞く授業や理科実験に挑戦し、放課後は部活や自習に仲間と励みます。",
    parent_summary: "【教育方針・進学】川崎市初の公立中高一貫校。臨海部の最先端研究拠点と連携した理数・探究教育を展開し、国公立大学や難関私大への合格実績を着実に伸ばしています。【環境・費用】川崎駅徒歩圏。公立のため授業料無償です。",
    child_summary: "川崎駅のすぐ近くにあって便利！ロボットやバイオテクノロジーなど最先端の科学を楽しく学べる授業がたくさんあるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_drawing_create"],
    interest_category_label: "先端産業・科学探究",
    is_favorite: false
  },
  {
    school_id: "sch_kawaguchi_fuzoku",
    name: "川口市立高等学校附属中学校",
    name_ruby: "かわぐちしりつこうとうがっこうふぞくちゅうがっこう",
    official_url: "https://kawaguchicity-jh.ed.jp/",
    catchphrase: "最先端の超近代的大キャンパス。未来を創るCIRAT探究と高い知性を育む埼玉の注目公立校",
    recommend_phrase: "★ 大学並みの最新鋭キャンパスで、科学探究や英語ディベートに思いきり熱中したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "埼玉県",
    district: "川口市上青木",
    station_name: "西川口駅",
    access_info: {
      primary_line: "JR京浜東北線・埼玉高速鉄道",
      hub_station: "赤羽駅・大宮駅・上野駅",
      walk_minutes: 0,
      bus_minutes: 8,
      school_bus: false,
      school_bus_note: "JR「西川口駅」東口・埼玉高速鉄道「鳩ヶ谷駅」より路線バス約8分"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "最新鋭施設・先進探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 94,
    recent_passed_records: "東京大・東北大・早慶上理など難関大進学へ飛躍的な実績を記録中",
    events: [
      {
            "id": "ev_kawa_1",
            "title": "学校説明会・施設見学フェスタ",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "大学顔負けのメディアセンターや理科実験棟を実際に見学できます。"
      }
],
    special_classes: [
      {
            "title": "CIRAT探究プログラム",
            "desc": "大学やSKIPシティと連携した映像・情報技術・科学の最先端課題研究！"
      }
],
    school_strengths: [
      "全国公立校屈指の美しさと規模を誇る超近代的新キャンパス！",
      "SKIPシティ（映像・科学の拠点）と直結した先進的な探究カリキュラム！",
      "都心（赤羽・池袋・東京）からの抜群のアクセスと公立の安心学費！"
],
    life_simulation: "西川口駅からバスで美しい大キャンパスへ。ガラス張りの図書館や本格的な大ホール、アリーナで学び、放課後は部活に汗を流します。",
    parent_summary: "【教育方針・進学】川口市が総力を挙げて創設した公立中高一貫校。大学を彷彿とさせる圧倒的な施設設備と、高度な理数・国際探究プログラムにより、新設校ながら難関大合格実績が急上昇しています。【環境・費用】SKIPシティ至近。公立のため授業料無償。",
    child_summary: "まるで大学みたいにピッカピカでカッコいい校舎！最新のパソコン室や大きな体育館があって、毎日の学校生活がワクワクするよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_drawing_create"],
    interest_category_label: "最新設備・科学情報探究",
    is_favorite: false
  },
  {
    school_id: "sch_ina_gakuen",
    name: "埼玉県立伊奈学園中学校",
    name_ruby: "さいたまけんりついながくえんちゅうがっこう",
    official_url: "https://inagakuen.spec.ed.jp/jhs/",
    catchphrase: "日本最大級のメガキャンパス。「学びのバイキング」で広大な可能性を切り拓く",
    recommend_phrase: "★ 体育館3つ、広大なグラウンドを持つ国内最大級の環境で、自分の好きな学問をとことん選びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "埼玉県",
    district: "北足立郡伊奈町学園",
    station_name: "羽貫駅",
    access_info: {
      primary_line: "埼玉新都市交通ニューシャトル",
      hub_station: "大宮駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "ニューシャトル「羽貫駅」より徒歩10分、JR上尾駅・蓮田駅よりバス"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫普通科（7つのハウス制）",
    commute_time: 35,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "arts"],
    vibe_label: "広大自由・総合選択",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 91,
    recent_passed_records: "東京大・東北大・埼玉大・早慶上理などへ毎年多数合格",
    events: [
      {
            "id": "ev_ina_1",
            "title": "学校説明会・ハウス見学",
            "date": "10月4日(土)",
            "type": "学校説明会",
            "desc": "広大なキャンパスと独自のハウス制（小校舎制）をご案内します。"
      }
],
    special_classes: [
      {
            "title": "総合選択探究＆語学イマージョン",
            "desc": "ドイツ語・フランス語・中国語など多彩な第2外国語や高度な芸術選択！"
      }
],
    school_strengths: [
      "東京ドーム数個分の広大な敷地！体育館3つ・50m公認プール等の圧倒的設備！",
      "全日本吹奏楽コンクール常連の吹奏楽部など全国最高峰の部活動！",
      "大学のように自分の進路に合わせて科目を選べる柔軟なカリキュラム！"
],
    life_simulation: "ニューシャトル羽貫駅から広大な校地へ。ハウス（小校舎）の仲間と交流し、午後は自分の興味に合わせて選んだ授業を受け、放課後は部活に没頭します。",
    parent_summary: "【教育方針・進学】国内最大規模を誇る公立総合選択制中高一貫校。ハウス制により大規模校ながら温かい人間関係を維持。埼玉大・東大をはじめ国公立大・難関私大へ安定した実績を誇ります。【環境・費用】伊奈町の広大な敷地。公立のため授業料無償です。",
    child_summary: "体育館が3つもあって、グラウンドもプールも規格外の広さ！吹奏楽やスポーツが全国レベルで、好きな科目を自分で選んで学べるよ！",
    tags: ["interest_sports_outdoor", "interest_drawing_create", "interest_history_culture"],
    interest_category_label: "メガキャンパス・総合選択",
    is_favorite: false
  },
  {
    school_id: "sch_inage_kokusai",
    name: "千葉市立稲毛国際中等教育学校",
    name_ruby: "ちばしりついなげこくさいちゅうとうきょういくがっこう",
    official_url: "https://www.city.chiba.jp/school/hs/001/index.html",
    catchphrase: "国際バカロレア（IB）認定。ベイエリアから世界へ飛び立つグローバル中等教育",
    recommend_phrase: "★ 海に近い開放的なベイエリアで、英語や異文化探究を思いきり学び、世界へ羽ばたきたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "千葉県",
    district: "千葉市美浜区高洲",
    station_name: "稲毛海岸駅",
    access_info: {
      primary_line: "JR京葉線・総武線",
      hub_station: "東京駅・海浜幕張駅・千葉駅",
      walk_minutes: 15,
      bus_minutes: 5,
      school_bus: false,
      school_bus_note: "JR京葉線「稲毛海岸駅」徒歩15分、JR稲毛駅よりバス約10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中等教育課程（国際中等教育・IB認定コース併設）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["arts", "academics"],
    vibe_label: "国際バカロレア・海風キャンパス",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 92,
    recent_passed_records: "東京外大・筑波大・千葉大・早慶上智・海外名門大などへ多数合格",
    events: [
      {
            "id": "ev_inage_1",
            "title": "IBプログラム説明会・学校公開",
            "date": "10月25日(土)",
            "type": "学校説明会",
            "desc": "世界基準のIB教育カリキュラムと英語イマージョン授業を公開！"
      }
],
    special_classes: [
      {
            "title": "国際バカロレアMYP/DP探究＆SDGsグローバルリサーチ",
            "desc": "環境問題や国際紛争の解決策を自ら調べ、英語でプレゼンテーション！"
      }
],
    school_strengths: [
      "国際バカロレア（IB）認定の千葉市立唯一の中等教育学校！",
      "海に近い開放的で美しい幕張・稲毛ベイエリアの文教環境！",
      "公立校のため極めてリーズナブルに世界水準の国際教育を受講可能！"
],
    life_simulation: "稲毛海岸駅から海風を感じながら登校。日常的に英語でディスカッションを行い、放課後は部活や国際ボランティア活動に主体的に取り組みます。",
    parent_summary: "【教育方針・進学】国際バカロレア（IB）プログラムを導入した千葉市立の中等教育学校。高度な英語運用能力と論理的思考力を養成し、難関国立大・難関私立大・海外大学への進学実績が急伸しています。【環境・費用】美浜区の整備された街並み。公立のため授業料無償。",
    child_summary: "海の近くにあって空が広いキレイな学校！英語で友達と話したり、世界のいろんな国の問題についてみんなで考える楽しい授業があるよ！",
    tags: ["interest_drawing_create", "interest_nature_biology", "interest_history_culture"],
    interest_category_label: "国際バカロレア・海風探究",
    is_favorite: false
  },
  {
    school_id: "sch_mito_first",
    name: "茨城県立水戸第一高等学校附属中学校",
    name_ruby: "いばらきけんりつみとだいいちこうとうがっこうふぞくちゅうがっこう",
    official_url: "http://www.mito1-jh.ibk.ed.jp/",
    catchphrase: "水戸藩の学問の系譜。「至誠・剛毅」を胸に東大・医学部を目指す茨城の最高峰",
    recommend_phrase: "★ 水戸城跡の歴史ある学び舎で、学問の本質を深く追究し、高い志を持つ仲間と切磋琢磨したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "茨城県",
    district: "水戸市三の丸",
    station_name: "水戸駅",
    access_info: {
      primary_line: "JR常磐線・水郡線・水戸線",
      hub_station: "水戸駅・勝田駅・日立駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR「水戸駅」北口より徒歩10分（水戸城本丸跡）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "stem"],
    vibe_label: "水戸学の伝統・最高峰進学",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 63,
    match_rate_child: 94,
    recent_passed_records: "東京大学・東北大学・筑波大学・国公立大学医学部に毎年圧倒的な合格実績",
    events: [
      {
            "id": "ev_mito1_1",
            "title": "学校説明会・水戸城史跡見学会",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "水戸一高附属中の探究カリキュラムと進学指導方針を解説します。"
      }
],
    special_classes: [
      {
            "title": "水戸一高メディカル＆アカデミック探究ゼミ",
            "desc": "筑波大学医学部等と連携した先端医療セミナーや高度理数ゼミ！"
      }
],
    school_strengths: [
      "茨城県公立ナンバーワンの歴史・伝統と圧倒的な東大・難関大合格実績！",
      "水戸城本丸跡に位置し、水戸駅徒歩10分の交通至便な立地！",
      "中高一貫化により先取り学習と医学部特化プログラムがさらに充実！"
],
    life_simulation: "水戸駅から歴史ある城跡の坂を登って登校。ハイレベルな仲間と高度な議論を交わし、放課後は部活や伝統の歩く会（行事）に向けて鍛錬します。",
    parent_summary: "【教育方針・進学】茨城県のトップ校・水戸一高の附属中学校。弘道館・水戸藩の学問精神を継承し、東大・東北大・医学部へ県内屈指の実績を誇ります。医学部志望者向けプログラムも手厚い。【環境・費用】水戸城本丸跡の風格ある環境。公立のため授業料無償。",
    child_summary: "本物のお城の跡地にあるかっこいい学校！茨城県で一番勉強ができるすごい先輩や友達と一緒に、高い目標に向かって楽しく学べるよ！",
    tags: ["interest_history_culture", "interest_puzzle_math", "interest_science_space"],
    interest_category_label: "歴史伝統・茨城最高峰",
    is_favorite: false
  },
  {
    school_id: "sch_tsuchiura_first",
    name: "茨城県立土浦第一高等学校附属中学校",
    name_ruby: "いばらきけんりつつちうらだいいちこうとうがっこうふぞくちゅうがっこう",
    official_url: "http://www.tsuchiura1-jh.ibk.ed.jp/",
    catchphrase: "「自主・協同・責任」。旧本館（国重文）の誇りとともに東大・医学部へ躍進する名門",
    recommend_phrase: "★ 国の重要文化財の校舎を持つ格式ある環境で、全国トップクラスの大学進学を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "茨城県",
    district: "土浦市真鍋",
    station_name: "土浦駅",
    access_info: {
      primary_line: "JR常磐線",
      hub_station: "土浦駅・つくば駅・取手駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "JR常磐線「土浦駅」西口より路線バス約10分「土浦一高前」下車"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["academics", "stem"],
    vibe_label: "歴史格式・東大難関大",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "東京大学（毎年30名前後）・国公立大学医学部に圧倒的な合格実績",
    events: [
      {
            "id": "ev_tsuchi1_1",
            "title": "学校説明会・重要文化財旧本館見学",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "国の重要文化財に指定された美しい木造校舎と一貫カリキュラムを解説！"
      }
],
    special_classes: [
      {
            "title": "土浦一高フロンティアサイエンスゼミ",
            "desc": "つくばの研究機関（KEK・JAXA・産総研）と連携したハイレベル探究！"
      }
],
    school_strengths: [
      "東大合格者数で全国公立高校トップクラスの実績を誇る土浦一高の中高一貫校！",
      "国の重要文化財に指定された壮麗な旧本館が象徴する120年の歴史！",
      "つくば研究学園都市の研究機関と直結した最先端の科学教育！"
],
    life_simulation: "土浦駅からバスで真鍋の丘へ。歴史ある重文校舎を眺めながら登校し、高度な数理・英語の授業を受け、放課後は部活や自習室で仲間と高め合います。",
    parent_summary: "【教育方針・進学】東大合格者数で全国屈指の土浦一高附属中。筑波研究学園都市に隣接する地の利を活かした高度な理数探究と、徹底した進路指導で医学部・難関国立大に抜群の成果を誇ります。【環境・費用】土浦市真鍋。公立のため授業料無償。",
    child_summary: "お城や博物館みたいな重文の木造校舎がすごく素敵！つくばの研究所に行って宇宙や素粒子の実験を学べるすごい学校だよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_history_culture"],
    interest_category_label: "重要文化財・東大医学部",
    is_favorite: false
  },
  {
    school_id: "sch_namiki_chuto",
    name: "茨城県立並木中等教育学校",
    name_ruby: "いばらきけんりつなみきちゅうとうきょういくがっこう",
    official_url: "http://www.namiki-cs.ibk.ed.jp/",
    catchphrase: "つくば研究学園都市の知の拠点。科学と国際理解で未来をデザインする中等教育学校",
    recommend_phrase: "★ 研究学園都市の恵まれた環境で、科学研究や英語プレゼンに思いきり打ち込みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "茨城県",
    district: "つくば市並木",
    station_name: "つくば駅",
    access_info: {
      primary_line: "つくばエクスプレス（TX）",
      hub_station: "つくば駅・秋葉原駅・北千住駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "つくばエクスプレス「つくば駅」より路線バス約10分「並木中等前」下車すぐ"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "つくば科学・先端中等教育",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "東京大・筑波大・東工大・国公立医学部・早慶上理へ多数進学",
    events: [
      {
            "id": "ev_namiki_1",
            "title": "学校説明会・先端サイエンス見学会",
            "date": "10月25日(土)",
            "type": "学校説明会",
            "desc": "6年間一貫の探究論文執筆プログラムと国際教育を紹介します。"
      }
],
    special_classes: [
      {
            "title": "並木サイエンスリサーチ＆国際学会発表",
            "desc": "JAXAや産総研の研究者と協働し、英語で研究論文を書き上げるプログラム！"
      }
],
    school_strengths: [
      "つくば研究学園都市の中心部に位置し、世界最高峰の研究機関と連携！",
      "6年一貫中等教育学校としての豊富な探究指導ノウハウ！",
      "筑波大学・東京大学など難関国立大学への高い現役進学率！"
],
    life_simulation: "つくば駅からペデストリアンデッキやバスで登校。緑あふれる学園都市のキャンパスで実験や英語討論に励み、放課後は自習室で勉強します。",
    parent_summary: "【教育方針・進学】つくば研究学園都市に立地する県立中等教育学校。国際性豊かな土地柄を反映し、科学教育と高度な英語教育に強み。筑波大・東大・国公立医学部等へ安定した現役進学実績を上げています。【環境・費用】つくば市並木。公立のため授業料無償。",
    child_summary: "JAXAや研究所がまわりにいっぱいある！科学の実験や宇宙の研究を本格的にできて、英語で発表するチャンスもたくさんあるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_nature_biology"],
    interest_category_label: "つくば科学・先端中等教育",
    is_favorite: false
  },
  {
    school_id: "sch_tondabayashi",
    name: "大阪府立富田林中学校",
    name_ruby: "おおさかふりつとんだばやしちゅうがっこう",
    official_url: "https://tonko.ed.jp/",
    catchphrase: "「地域と世界をつなぐグローカルリーダー」。南河内の伝統校で育む探究心",
    recommend_phrase: "★ 地域を愛し、世界の課題を解決する視野を持って、伸び伸びと学習と部活に励みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "大阪府",
    district: "富田林市谷川町",
    station_name: "富田林西口駅",
    access_info: {
      primary_line: "近鉄長野線",
      hub_station: "天王寺（大阪阿部野橋）駅・河内長野駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "近鉄長野線「富田林西口駅」より徒歩5分、富田林駅徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "グローカル・自主探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 59,
    match_rate_child: 92,
    recent_passed_records: "大阪大学・神戸大学・大阪公立大学・国公立大学へ高い合格率",
    events: [
      {
            "id": "ev_tonko_1",
            "title": "学校説明会・探究体験",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "南河内探究と中高一貫6年間の学習計画をご案内します。"
      }
],
    special_classes: [
      {
            "title": "グローカル探究プログラム",
            "desc": "世界遺産・百舌鳥古市古墳群などを題材に地域と世界の共通課題を探究！"
      }
],
    school_strengths: [
      "富田林西口駅徒歩5分の通学しやすい好立地！阿部野橋から直通！",
      "創立120年を超える名門「富高」の伝統と中高一貫教育のシナジー！",
      "大阪公立大・阪大など地元難関国公立大学への手厚い進学指導！"
],
    life_simulation: "富田林西口駅から徒歩5分。緑豊かな歴史あるキャンパスで学び、放課後は部活に汗を流し、図書室で仲間と勉強します。",
    parent_summary: "【教育方針・進学】府立旧制八中を前身とする名門校の中高一貫校。地域と世界をつなぐグローカル探究を推進し、阪大・神大・大阪公立大をはじめとする国公立大学への高い現役進学実績を誇ります。【環境・費用】富田林市。公立のため授業料無償です。",
    child_summary: "駅から近くて通いやすい！歴史ある古墳や自然を調べたり、友達と一緒に面白い探究活動や部活を思いきり楽しめるよ！",
    tags: ["interest_history_culture", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "地域探究・グローカル",
    is_favorite: false
  },
  {
    school_id: "sch_suito_kokusai",
    name: "大阪府立水都国際中学校",
    name_ruby: "おおさかふりつすいとこくさいちゅうがっこう",
    official_url: "https://osaka-city-ib.jp/",
    catchphrase: "日本初の公設民営中高一貫校。国際バカロレア（IB）で世界基準の学びを体現",
    recommend_phrase: "★ 外国人の先生と英語で学び、国際バカロレアのディプロマや海外大学進学を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "大阪府",
    district: "大阪市住之江区南港中",
    station_name: "ポートタウン西駅",
    access_info: {
      primary_line: "Osaka Metro南港ポートタウン線（ニュートラム）",
      hub_station: "コスモスクエア駅・住之江公園駅・梅田駅",
      walk_minutes: 3,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "ニュートラム「ポートタウン西駅」より徒歩3分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中高一貫国際科（IB認定コース併設）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["arts", "academics"],
    vibe_label: "国際バカロレア・公設民営",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 94,
    recent_passed_records: "大阪大学・京都大学・早慶上智・海外名門大学へ多数の合格実績",
    events: [
      {
            "id": "ev_suito_1",
            "title": "水都国際フェスタ＆説明会",
            "date": "10月25日(土)",
            "type": "学校説明会",
            "desc": "ネイティブ教員による英語イマージョン授業体験とIBプログラム解説！"
      }
],
    special_classes: [
      {
            "title": "国際バカロレア（IB）探究＆英語イマージョン",
            "desc": "多国籍な教員陣による英語での数学・理科指導とグローバル社会課題研究！"
      }
],
    school_strengths: [
      "日本初の公設民営学校！学校法人大阪加計学園による先進的な運営！",
      "全教員の半数近くが外国人教員！圧倒的な英語日常環境！",
      "公立校のためIB認定校でありながら授業料無償！"
],
    life_simulation: "ポートタウン西駅から歩いて3分。校舎内では日常的に英語が飛び交い、海外の学校とのプロジェクトやディスカッションを体験します。",
    parent_summary: "【教育方針・進学】全国初の公設民営中高一貫校。国際バカロレア（IB）認定校として、世界水準の探究教育と高度な英語イマージョンを実施。海外大学・国内最難関大の推薦入試等で目覚ましい実績を上げています。【環境・費用】住之江区南港。公立のため授業料無償。",
    child_summary: "学校の中はまるで外国みたい！先生の半分が外国人で、毎日英語でお話ししながら、ワクワクする実験や発表ができる楽しい学校だよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_puzzle_math"],
    interest_category_label: "国際バカロレア・公設民営",
    is_favorite: false
  },
  {
    school_id: "sch_saikyo_fuzoku",
    name: "京都市立西京高等学校附属中学校",
    name_ruby: "きょうとしりつさいきょうこうとうがっこうふぞくちゅうがっこう",
    official_url: "http://cms.edu.city.kyoto.jp/weblog/index.php?id=201605",
    catchphrase: "「進取・果敢」。エンタープライジングの精神で未来社会を創造する京都の公立トップ校",
    recommend_phrase: "★ ビジネスや社会イノベーションに興味があり、京都の中心で仲間と刺激し合いたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "京都府",
    district: "京都市中京区西ノ京東中合町",
    station_name: "西大路御池駅",
    access_info: {
      primary_line: "京都市営地下鉄東西線・JR山陰本線（嵯峨野線）・阪急京都線",
      hub_station: "京都駅・烏丸御池駅・西院駅",
      walk_minutes: 1,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "地下鉄東西線「西大路御池駅」出口すぐ、JR「円町駅」徒歩8分、阪急「西院駅」徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（エンタープライジング科一貫）",
    commute_time: 20,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "エンタープライジング・果敢挑戦",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 95,
    recent_passed_records: "京都大学（毎年50名前後）・大阪大学・東京大学・医学部に圧倒的な現役合格率",
    events: [
      {
            "id": "ev_saikyo_1",
            "title": "学校説明会・EP探究公開",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "西京のエンタープライジング教育と高い京大進学実績の秘密を公開！"
      }
],
    special_classes: [
      {
            "title": "エンタープライジング（EP）プロジェクト",
            "desc": "社会起業や新ビジネス・先端科学を想定し、課題発見から解決策を立案する探究！"
      }
],
    school_strengths: [
      "地下鉄西大路御池駅出口すぐ！京都市内各線から抜群の通学アクセス！",
      "京都大学合格者数で全国公立トップクラスの実績！",
      "社会を変革する意欲を育てる独自の「エンタープライジング」教育！"
],
    life_simulation: "地下鉄駅を出てわずか1分で近代的な校舎へ。熱気あふれるゼミやプレゼンテーションを行い、放課後は自習ラウンジや部活で仲間と過ごします。",
    parent_summary: "【教育方針・進学】「エンタープライジング科」を擁する京都公立の雄。起業家精神・果敢な挑戦心を培う探究学習と徹底した進学指導により、京大合格者数で全国最上位を維持。堀川・洛北と並ぶ京都公立御三家の筆頭です。【環境・費用】駅直結至近。公立のため授業料無償。",
    child_summary: "地下鉄の駅を出たらすぐ目の前！新しいアイデアを考えたり、プレゼン大会をしたり、京都大学を目指すかっこいい先輩たちと学べるよ！",
    tags: ["interest_puzzle_math", "interest_drawing_create", "interest_science_space"],
    interest_category_label: "起業家精神・京都大学",
    is_favorite: false
  },
  {
    school_id: "sch_kobe_fuzoku",
    name: "神戸大学附属中等教育学校",
    name_ruby: "こうべだいがくふぞくちゅうとうきょういくがっこう",
    official_url: "https://www.edu.kobe-u.ac.jp/kuss-top/",
    catchphrase: "「グローバル・キャリア教育」。神戸の海と山を臨むアカデミックな国立中等教育学校",
    recommend_phrase: "★ 神戸大学の研究リソースを活用し、最先端の学問や探究に没頭したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "兵庫県",
    district: "神戸市東灘区住吉山手",
    station_name: "住吉駅",
    access_info: {
      primary_line: "JR神戸線・阪急神戸線・阪神本線",
      hub_station: "大阪（梅田）駅・三ノ宮駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "JR・六甲ライナー「住吉駅」より市バス約10分「渦森台」方面行き"
    },
    can_walk: false,
    can_bicycle: false,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 30,
    tuition: 180000,
    gender_type: "coed",
    category: "national",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "学術探究・国立一貫",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 96,
    recent_passed_records: "東京大学・京都大学・大阪大学・神戸大学医学部等へ多数の現役合格",
    events: [
      {
            "id": "ev_kuf_1",
            "title": "学校説明会・公開研究発表",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "神戸大学との高大連携探究と生徒の自由研究展示をご案内します。"
      }
],
    special_classes: [
      {
            "title": "Kobeグローバル・リサーチ（KGR）",
            "desc": "神戸大学の教授陣から直接指導を受け、自ら問いを立てて論文を完成させる探究！"
      }
],
    school_strengths: [
      "神戸大学直属の国立中等教育学校！大学の最先端研究室と密接連携！",
      "京大・阪大・神大・医学部への極めて高い現役進学率！",
      "神戸の街と海を一望する六甲山麓の緑豊かで静謐な教育環境！"
],
    life_simulation: "住吉駅からバスで緑あふれる山の手キャンパスへ。神戸の海を眼下に見ながら高度な探究授業を受け、放課後は研究や部活に取り組みます。",
    parent_summary: "【教育方針・進学】国立・神戸大学の附属中等教育学校。6年間を通じた「KGR（課題研究）」など大学直結のアカデミックな教育を展開。京大・阪大・神大・国公立医学部等へ抜群の合格実績を誇ります。【環境・費用】東灘区住吉山手。国立校のため学費は格安です。",
    child_summary: "神戸の海や街が見渡せる山の手のキレイな学校！神戸大学のすごい研究室に行ってお話を聞いたり、自分の好きな研究に思いきり熱中できるよ！",
    tags: ["interest_science_space", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "国立中等・大学連携探究",
    is_favorite: false
  },
  {
    school_id: "sch_shiba_jh",
    name: "芝中学校",
    name_ruby: "しばちゅうがっこう",
    official_url: "https://www.shiba.ac.jp/",
    catchphrase: "「遵法自治」。東京タワーの麓で人を思いやる温かい心を育む伝統男子校",
    recommend_phrase: "★ アットホームで面倒見の良い先生たちに見守られ、穏やかに伸び伸びと男子校生活を満喫したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "港区芝公園",
    station_name: "神谷町駅",
    access_info: {
      primary_line: "東京メトロ日比谷線・都営三田線",
      hub_station: "霞ケ関駅・六本木駅・大手町駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東京メトロ日比谷線「神谷町駅」徒歩5分、都営三田線「御成門駅」徒歩2分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 20,
    tuition: 930000,
    gender_type: "boys",
    category: "private",
    religion: "buddhist",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "遵法自治・温厚篤実",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 64,
    match_rate_child: 94,
    recent_passed_records: "東京大学・東京工業大学・国公立大学医学部・早慶上理へ多数進学",
    events: [
      {
            "id": "ev_shiba_1",
            "title": "芝学園祭",
            "date": "9月20日(土)〜21日(日)",
            "type": "文化祭",
            "desc": "東京タワーのすぐ下で繰り広げられる芝生たちの温かく熱い文化祭！"
      }
],
    special_classes: [
      {
            "title": "芝漬（体験学習）＆仏教情操教育",
            "desc": "増上寺の伝統を受け継ぐ他者への思いやりと、多彩な体験型野外実習！"
      }
],
    school_strengths: [
      "東京タワーの目の前！神谷町駅徒歩5分・御成門駅徒歩2分の抜群の立地！",
      "「芝漬」と呼ばれる温かい校風。自己肯定感を高める丁寧な男子教育！",
      "東大・難関国立大・早慶への堅実で高い現役進学実績！"
],
    life_simulation: "神谷町駅から東京タワーを見上げながら登校。温かい先生や朗らかな仲間と笑い合い、放課後は部活に打ち込んで自習室で勉強します。",
    parent_summary: "【教育方針・進学】増上寺の学寮を起源とする伝統男子進学校。「遵法自治」を標榜し、厳しく押し付けるのではなく生徒自らが気づき成長する「芝温泉」とも称される温かい校風が特長。東大をはじめ難関大へ確固たる実績を残しています。【環境・費用】港区芝公園至近。",
    child_summary: "東京タワーのすぐ下にあって景色が最高！先生たちも先輩もみんなとっても優しくて、男子校ならではの楽しい毎日を安心して過ごせるよ！",
    tags: ["interest_sports_outdoor", "interest_history_culture", "interest_puzzle_math"],
    interest_category_label: "温厚篤実・伝統男子進学校",
    is_favorite: false
  },
  {
    school_id: "sch_hongo_jh",
    name: "本郷中学校",
    name_ruby: "ほんごうちゅうがっこう",
    official_url: "https://www.hongo.ed.jp/",
    catchphrase: "「強健・厳正・勤勉」。「本郷ラーニングプラザ」で文武両道を極める名門男子校",
    recommend_phrase: "★ 巣鴨駅近くの快適な環境で、ラグビーやサッカーに燃えつつ、東大・難関大を真剣に狙いたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "豊島区駒込",
    station_name: "巣鴨駅",
    access_info: {
      primary_line: "JR山手線・都営三田線・東京メトロ南北線",
      hub_station: "池袋駅・上野駅・大手町駅",
      walk_minutes: 3,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR山手線・都営三田線「巣鴨駅」徒歩3分、南北線「駒込駅」徒歩7分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 20,
    tuition: 940000,
    gender_type: "boys",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "文武両道・強健勤勉",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 65,
    match_rate_child: 95,
    recent_passed_records: "東京大学・東京工業大学・国公立大学医学部・早慶上理へ急伸する進学実績",
    events: [
      {
            "id": "ev_hongo_1",
            "title": "本郷祭（文化祭）",
            "date": "9月27日(土)〜28日(日)",
            "type": "文化祭",
            "desc": "男子校の活気と知的な研究展示、クラブ体験が満載の秋の大イベント！"
      }
],
    special_classes: [
      {
            "title": "自学自習力育成「本郷プラザ」＆数学力強化プログラム",
            "desc": "徹底した基礎反復と放課後の個別チューター指導による盤石な学力形成！"
      }
],
    school_strengths: [
      "JR山手線・都営三田線「巣鴨駅」徒歩3分の比類なきアクセス！",
      "花園出場のラグビー部をはじめとする強豪スポーツ部と高い大学実績の両立！",
      "人工芝グラウンドや「ラーニングプラザ」など最新鋭の学習施設！"
],
    life_simulation: "巣鴨駅から歩いてわずか3分。人工芝グラウンドで爽やかに汗を流し、最新の自習センターで夜まで集中して学習に取り組みます。",
    parent_summary: "【教育方針・進学】山手線巣鴨駅至近の完全中高一貫男子校。「文武両道」を掲げ、運動部への高い加入率を誇りながら、東大・難関国立大・医学部・早慶への進学実績が近年著しく伸長。面倒見の良さでも高い評価を得ています。【環境・費用】巣鴨駅徒歩3分で通学安心。",
    child_summary: "巣鴨駅から歩いてすぐ！ピカピカの人工芝グラウンドがあって、ラグビーやサッカー、勉強も全部全力でかっこよく頑張れる学校だよ！",
    tags: ["interest_sports_outdoor", "interest_puzzle_math", "interest_science_space"],
    interest_category_label: "文武両道・駅近男子名門",
    is_favorite: false
  },
  {
    school_id: "sch_hiroo_gakuen",
    name: "広尾学園中学校",
    name_ruby: "ひろおがくえんちゅうがっこう",
    official_url: "https://www.hiroogakuen.ed.jp/",
    catchphrase: "「自律と共生」。医進・サイエンスとインターナショナルで最先端を走る都心共学校",
    recommend_phrase: "★ 最新のiPadや電子顕微鏡を使った研究、またはオールイングリッシュの国際教育に挑戦したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "東京都",
    district: "港区南麻布",
    station_name: "広尾駅",
    access_info: {
      primary_line: "東京メトロ日比谷線",
      hub_station: "恵比寿駅・六本木駅・銀座駅",
      walk_minutes: 1,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "東京メトロ日比谷線「広尾駅」4番出口より徒歩1分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "本科コース・医進サイエンスコース・インターナショナルコース",
    commute_time: 20,
    tuition: 1050000,
    gender_type: "coed",
    category: "private",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "arts"],
    vibe_label: "最先端ICT・医進国際",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 67,
    match_rate_child: 96,
    recent_passed_records: "東京大学・国公立大学医学部・海外名門大学・早慶上理へ驚異的な進学実績",
    events: [
      {
            "id": "ev_hiroo_1",
            "title": "けやき祭（文化祭）",
            "date": "10月4日(土)〜5日(日)",
            "type": "文化祭",
            "desc": "医進サイエンスの研究プレゼンやインターナショナルの英語劇が圧巻！"
      }
],
    special_classes: [
      {
            "title": "医進・サイエンス研究室＆オールイングリッシュ授業",
            "desc": "大学研究室レベルの実験機材で自らテーマを探究する先進プログラム！"
      }
],
    school_strengths: [
      "東京メトロ日比谷線「広尾駅」徒歩1分の超一等地キャンパス！",
      "一人一台のMac/iPadを活用した先進的ICT教育のパイオニア！",
      "医学部・海外トップ大学・東大への合格実績が全国屈指の伸び率！"
],
    life_simulation: "広尾駅の出口を出てすぐに登校。最新のタブレットを使って国内外の共同研究に取り組み、放課後は実験室や自習ラウンジで仲間と語り合います。",
    parent_summary: "【教育方針・進学】都内屈指の超人気共学校。医進・サイエンスコースやインターナショナルコースなど時代のニーズを先取りしたコース制を敷き、東大・海外名門大・国公立私立医学部に目覚ましい合格実績を築いています。【環境・費用】港区南麻布・広尾駅徒歩1分。",
    child_summary: "広尾駅から歩いて1分！一人一台パソコンやタブレットを使って、本格的な科学研究をしたり英語でペラペラ話せるようになる未来の学校だよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_drawing_create"],
    interest_category_label: "先端医進・国際イノベーション",
    is_favorite: false
  },
  {
    school_id: "sch_eiko_gakuen",
    name: "栄光学園中学校",
    name_ruby: "えいこうがくえんちゅうがっこう",
    official_url: "https://eiko.ed.jp/",
    catchphrase: "「Men for Others, with Others」。大船の豊かな緑の丘で本質的な思索を深める神奈川男子御三家",
    recommend_phrase: "★ 広大な自然の中で仲間と走り回り、毎朝の体操と深い思考力で一生モノの学問を究めたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "鎌倉市玉縄",
    station_name: "大船駅",
    access_info: {
      primary_line: "JR東海道線・横須賀線・根岸線・湘南新宿ライン",
      hub_station: "横浜駅・品川駅・藤沢駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR各線「大船駅」西口より徒歩15分（緑豊かな丘陵地）"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 30,
    tuition: 910000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "他者のために・自学思索",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 69,
    match_rate_child: 97,
    recent_passed_records: "東京大学・京都大学・国公立大学医学部に毎年極めて高い合格率（東大合格約50名）",
    events: [
      {
            "id": "ev_eiko_1",
            "title": "栄光祭（文化祭）",
            "date": "5月10日(土)〜11日(日)",
            "type": "文化祭",
            "desc": "広大な自然キャンパスで生徒がゼロから創り上げる知的好奇心満載の祭典！"
      }
],
    special_classes: [
      {
            "title": "栄光体操＆カトリック倫理探究ゼミ",
            "desc": "心身を鍛える伝統の栄光体操と、深く社会の正義と自己を見つめる対話授業！"
      }
],
    school_strengths: [
      "神奈川男子御三家の最高峰！圧倒的な東大合格率と知的教育環境！",
      "隈研吾氏設計の木造新校舎と広大な自然林・総合グラウンド！",
      "イエズス会教育による「他者のために生きる人間」を育む全人教育！"
],
    life_simulation: "大船駅から丘を登って自然に囲まれた校舎へ。毎朝グラウンドで体操をしてから集中して高度な学問を学び、放課後は部活に汗を流します。",
    parent_summary: "【教育方針・進学】イエズス会を母体とする神奈川男子御三家の名門。詰め込みを排し、深い思索力と倫理観を育成。東大・京大・国公立医学部への現役合格率で常に全国最上位クラスを維持しています。【環境・費用】鎌倉市大船の広大な丘陵地。自然と調和した木造校舎。",
    child_summary: "木がいっぱいの広い丘の上にあるカッコいい学校！毎朝みんなで体操をして体を鍛えて、算数のパズルや科学の探究をとことん楽しめるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_nature_biology"],
    interest_category_label: "イエズス会・真理探究",
    is_favorite: false
  },
  {
    school_id: "sch_ferris",
    name: "フェリス女学院中学校",
    name_ruby: "ふぇりすじょがくいんちゅうがっこう",
    official_url: "https://www.ferris.ed.jp/",
    catchphrase: "「For Others」。横浜山手の丘で高い知性と他者への奉仕の心を育む名門女子校",
    recommend_phrase: "★ 横浜の美しい歴史ある丘で、音楽や文学を深く愛し、自由と自立の精神を持った女性に成長したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "神奈川県",
    district: "横浜市中区山手町",
    station_name: "石川町駅",
    access_info: {
      primary_line: "JR根岸線（京浜東北線直通）・みなとみらい線",
      hub_station: "横浜駅・桜木町駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR根岸線「石川町駅」南口徒歩10分、みなとみらい線「元町・中華街駅」徒歩15分"
    },
    can_walk: true,
    can_bicycle: false,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 930000,
    gender_type: "girls",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["academics", "arts"],
    vibe_label: "For Others・高い知性",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 95,
    recent_passed_records: "東京大学・国公立大学医学部・早慶上理などへ極めて高い現役合格率",
    events: [
      {
            "id": "ev_ferris_1",
            "title": "フェリス祭（文化祭）",
            "date": "11月1日(土)〜2日(日)",
            "type": "文化祭",
            "desc": "山手の丘が華やぐ伝統の学園祭。オルガン演奏や洗練されたクラブ展示！"
      }
],
    special_classes: [
      {
            "title": "聖書・オルガン科＆リベラルアーツ探究",
            "desc": "本物のパイプオルガンに触れる音楽教育と、社会正義を考えるキリスト教倫理！"
      }
],
    school_strengths: [
      "神奈川女子御三家（フェリス・横浜共立・横浜雙葉）の頂点！",
      "横浜山手の異国情緒あふれる美しい文教地区に位置！",
      "細かな規則を設けず生徒の自律と高い学問探究を重んじる自由な校風！"
],
    life_simulation: "石川町駅から山手の坂を登って登校。チャペルでパイプオルガンの音色とともに祈りを捧げ、知的好奇心に満ちたハイレベルな授業を受けます。",
    parent_summary: "【教育方針・進学】1870年創立の日本最古の女子校の一つ。「For Others」の精神のもと、自立した高い知性を持つ女性を育成。東大・難関国立大・医学部・早慶へ安定した高い進学実績を誇ります。【環境・費用】横浜山手の歴史ある景観地区。通学環境抜群。",
    child_summary: "横浜の山の手のおしゃれな丘の上にある憧れの学校！大きなパイプオルガンの音がとても美しくて、優しくて知的な友達と楽しい毎日を過ごせるよ！",
    tags: ["interest_drawing_create", "interest_history_culture", "interest_puzzle_math"],
    interest_category_label: "横浜山手・キリスト教女子最高峰",
    is_favorite: false
  },
  {
    school_id: "sch_rakusei",
    name: "洛星中学校",
    name_ruby: "らくせいちゅうがっこう",
    official_url: "https://www.rakusei.ac.jp/",
    catchphrase: "カトリック・ヴィアトール会。「心・知・体」の調和を追求する京都男子の最高峰",
    recommend_phrase: "★ 京都の歴史ある街で、キリスト教の温かい精神に包まれながら、京大・東大・医学部を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "京都府",
    district: "京都市北区白梅町",
    station_name: "北野白梅町駅",
    access_info: {
      primary_line: "JR嵯峨野線・京福北野線・京都市バス",
      hub_station: "京都駅・二条駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "京福「北野白梅町駅」徒歩10分、JR「円町駅」徒歩15分、市バス「北野白梅町」下車"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 920000,
    gender_type: "boys",
    category: "private",
    religion: "christian",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "温和・京都男子名門",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 66,
    match_rate_child: 95,
    recent_passed_records: "京都大学（毎年40〜50名）・東京大学・国公立大学医学部に圧倒的な現役合格実績",
    events: [
      {
            "id": "ev_rakusei_1",
            "title": "クリスマスページェント＆学校説明会",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "カトリック教育の温かさとハイレベルな学習環境をご紹介します。"
      }
],
    special_classes: [
      {
            "title": "ヴィアトール教養ゼミ＆オーケストラ鑑賞",
            "desc": "学問の本質と豊かな芸術的感性を養う洛星独自の情操カリキュラム！"
      }
],
    school_strengths: [
      "洛南と並び称される京都私立男子校のツートップ！",
      "京大・国公立医学部合格者数において全国屈指の現役進学率！",
      "全員がクラブ活動に所属し、オーケストラ部など文化系・運動系ともに全国レベル！"
],
    life_simulation: "北野天満宮に近い落ち着いた街並みを歩いて登校。質の高い授業で思考を深め、放課後はクラブ活動に汗を流し、図書室で自習します。",
    parent_summary: "【教育方針・進学】カトリック・ヴィアトール修道会を設立母体とする名門男子校。ほぼ全生徒がクラブ活動に所属する文武両道を実践しつつ、京都大学や国公立医学部へ抜群の合格実績を残しています。【環境・費用】京都市北区の閑静な文教地区。",
    child_summary: "京都で大人気の男子校！先生がとても温かく、勉強もオーケストラやサッカーなどの部活も、仲間と一緒に思いきり熱中できる素晴らしい学校だよ！",
    tags: ["interest_puzzle_math", "interest_history_culture", "interest_sports_outdoor"],
    interest_category_label: "京都男子名門・京都大学医学部",
    is_favorite: false
  },
  {
    school_id: "sch_sapporo_kaisei",
    name: "市立札幌開成中等教育学校",
    name_ruby: "しりつさっぽろかいせいちゅうとうきょういくがっこう",
    official_url: "https://www.kaisei-s.sapporo-c.ed.jp/",
    catchphrase: "「一貫教育・国際バカロレア」。探究型学習で未来社会を創造する北海道の公立中等教育校",
    recommend_phrase: "★ 世界基準の国際バカロレア（IB）探究や課題解決学習で、自ら問いを立てて学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "北海道",
    district: "札幌市東区北22条東",
    station_name: "元町駅",
    access_info: {
      primary_line: "札幌市営地下鉄東豊線",
      hub_station: "さっぽろ駅・大通駅",
      walk_minutes: 15,
      bus_minutes: 5,
      school_bus: false,
      school_bus_note: "地下鉄東豊線「元町駅」または「環状通東駅」より徒歩15分（中央バス約5分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中等教育課程（IB認定・6年一貫）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "国際バカロレア・探究創造",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 93,
    recent_passed_records: "北海道大学・東京大学・京都大学・国公立大医学部へ多数合格",
    events: [
      {
            "id": "ev_skaisei_1",
            "title": "学校説明会・IB授業体験",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "北海道初の公立国際バカロレア認定校の探究プログラムを体感！"
      }
],
    special_classes: [
      {
            "title": "コズモサイエンス＆IB探究プロジェクト",
            "desc": "教科を横断した課題解決型学習と英語によるプレゼンテーション！"
      }
],
    school_strengths: [
      "北海道の公立校として唯一の国際バカロレア（MYP/DP）一貫認定校！",
      "北海道大学をはじめとする難関国公立大学への高い現役合格実績！",
      "公立校のため学費無償で最先端のグローバル探究教育を受講可能！"
],
    life_simulation: "地下鉄元町駅から登校。答えのない課題について仲間とディスカッションし、放課後は部活や研究論文の執筆に打ち込みます。",
    parent_summary: "【教育方針・進学】国際バカロレア（IB）を導入した札幌市立の中等教育学校。自律的な探究学習と英語プレゼン力を育成し、北大・東大・国公立医学部への高い合格実績を残しています。【環境・費用】札幌市東区。公立のため授業料無償。",
    child_summary: "先生からの一方的な授業ではなく、みんなで疑問を出し合って実験や発表をする楽しい学校！英語もたくさん使えて世界が広がるよ！",
    tags: ["interest_science_space", "interest_drawing_create", "interest_puzzle_math"],
    interest_category_label: "国際バカロレア・先端探究",
    is_favorite: false
  },
  {
    school_id: "sch_sendai_seiryo",
    name: "仙台市立仙台青陵中等教育学校",
    name_ruby: "せんだいしりつせんだいせいりょうちゅうとうきょういくがっこう",
    official_url: "https://sites.google.com/g.sendai-c.ed.jp/301-sendaiseiryochuto-ss/%E3%83%9B%E3%83%BC%E3%83%A0",
    catchphrase: "杜の都の英知。「確かな学力と豊かな人間性」を育む仙台の中等教育学校",
    recommend_phrase: "★ 東北大学進学を目指し、緑豊かな青葉山を望む落ち着いた環境で6年間じっくり学びたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "宮城県",
    district: "仙台市青葉区国見ケ丘",
    station_name: "国見駅",
    access_info: {
      primary_line: "JR仙山線・仙台市営バス",
      hub_station: "仙台駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR仙山線「国見駅」徒歩15分、仙台駅より市営バス約25分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "杜の都・学問探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 92,
    recent_passed_records: "東北大学（毎年多数合格）・東京大学・国公立大学へ高い進学実績",
    events: [
      {
            "id": "ev_sseiryo_1",
            "title": "学校説明会・施設見学",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "6年間を見通したカリキュラムと青陵独自の探究活動を紹介します。"
      }
],
    special_classes: [
      {
            "title": "青陵サイエンス＆イノベーションゼミ",
            "desc": "東北大学の研究室や自然環境を活用した課題解決型探究！"
      }
],
    school_strengths: [
      "仙台二華と並ぶ宮城県内公立一貫校の代表格！",
      "東北大学への抜群の現役進学実績と徹底した個別学習指導！",
      "杜の都・仙台の緑に囲まれた美しく静謐な学習環境！"
],
    life_simulation: "国見駅から丘を登って登校。広々とした教室でハイレベルな授業を受け、放課後は部活や充実した自習室で勉強します。",
    parent_summary: "【教育方針・進学】仙台市が設置する完全6年一貫中等教育学校。東北大をはじめ難関国公立大学への高い現役進学率を誇り、手厚い進路指導と公立ならではの安心感が強みです。【環境・費用】青葉区国見ケ丘。公立のため授業料無償。",
    child_summary: "緑がいっぱいの丘の上にあって空気が気持ちいい！東北大学を目指す仲間と一緒に、理科の実験や楽しい部活動に打ち込めるよ！",
    tags: ["interest_nature_biology", "interest_puzzle_math", "interest_science_space"],
    interest_category_label: "東北大学連携・杜の都探究",
    is_favorite: false
  },
  {
    school_id: "sch_hamamatsu_nishi",
    name: "静岡県立浜松西高等学校中等部",
    name_ruby: "しずおかけんりつはままつにしこうとうがっこうちゅうとうぶ",
    official_url: "http://www.edu.pref.shizuoka.jp/hamamatsunishi-h/home.nsf/IndexFormView?OpenView",
    catchphrase: "「自主・自律・誠実」。ものづくりの街・浜松で未来の科学者とリーダーを育成",
    recommend_phrase: "★ 静岡県西部の最高峰で、ものづくりの精神と高い学力を身につけ、難関国立大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "静岡県",
    district: "浜松市中区鴨江",
    station_name: "浜松駅",
    access_info: {
      primary_line: "JR東海道新幹線・東海道本線・遠州鉄道",
      hub_station: "浜松駅・掛川駅・豊橋駅",
      walk_minutes: 0,
      bus_minutes: 10,
      school_bus: false,
      school_bus_note: "JR浜松駅バスターミナルより遠鉄バス約10分「浜松西高」下車すぐ"
    },
    can_walk: false,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "stem"],
    vibe_label: "ものづくり・文武両道",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 92,
    recent_passed_records: "東京大学・京都大学・名古屋大学・浜松医科大学医学部へ毎年多数合格",
    events: [
      {
            "id": "ev_hnishi_1",
            "title": "中等部学校説明会",
            "date": "10月4日(土)",
            "type": "学校説明会",
            "desc": "浜松西の一貫教育カリキュラムと高い医学部・難関大実績をご案内します。"
      }
],
    special_classes: [
      {
            "title": "浜松西テクノロジー＆メディカル探究",
            "desc": "地元自動車・光技術企業や浜松医科大と連携した実践的サイエンス講座！"
      }
],
    school_strengths: [
      "静岡県西部を代表する公立中高一貫の伝統進学校！",
      "名大・東大・浜松医大医学部への確固たる合格実績！",
      "文武両道の校風で運動部・文化部ともに県内上位で活躍！"
],
    life_simulation: "浜松駅からバスで登校。質の高い講義と熱気ある部活動を両立し、放課後は自習室で医学部や難関大合格を目指して研鑽を積みます。",
    parent_summary: "【教育方針・進学】浜松市を代表する県立中高一貫進学校。理数・科学技術に強い地域性を活かした教育を行い、名大・東大・国公立医学部に安定した多数の合格者を誇ります。【環境・費用】浜松市中心部に近く通学容易。公立のため授業料無償。",
    child_summary: "バイクやピアノなど世界的に有名なものづくりの街・浜松の名門校！勉強もスポーツも仲間と本気で競い合って成長できるよ！",
    tags: ["interest_sports_outdoor", "interest_science_space", "interest_puzzle_math"],
    interest_category_label: "ものづくり・名門公立一貫",
    is_favorite: false
  },
  {
    school_id: "sch_okayama_sozan",
    name: "岡山県立岡山操山中学校",
    name_ruby: "おかやまけんりつおかやまそうざんちゅうがっこう",
    official_url: "https://www.sozan-jhs.okayama-c.ed.jp/",
    catchphrase: "「和敬・愛譲・勤勉」。緑深き操山の麓で未来を切り拓く探究知を育む",
    recommend_phrase: "★ 落ち着いた環境の中で高い教養を身につけ、岡山大学や京都大学・大阪大学を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "岡山県",
    district: "岡山市中区浜",
    station_name: "西川原駅",
    access_info: {
      primary_line: "JR山陽本線・赤穂線",
      hub_station: "岡山駅",
      walk_minutes: 5,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR山陽本線・赤穂線「西川原・就実駅」より徒歩5分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 20,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "操山の精神・探究教養",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 61,
    match_rate_child: 93,
    recent_passed_records: "東京大学・京都大学・大阪大学・岡山大学医学部に多数の現役合格",
    events: [
      {
            "id": "ev_sozan_1",
            "title": "操山中等説明会・授業公開",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "中高一貫の特色あるカリキュラムと探究学習「未来航路」を公開！"
      }
],
    special_classes: [
      {
            "title": "探究活動「未来航路」プロジェクト",
            "desc": "自己の適性を見つめ、国内外の社会課題を6年間かけて追究する独自探究！"
      }
],
    school_strengths: [
      "JR西川原駅から徒歩5分！岡山駅から1駅の極めて至便な通学アクセス！",
      "岡山県立中高一貫第1号としての20年以上の充実したノウハウ！",
      "京大・阪大・岡大医学部など難関国公立大学への高い現役合格実績！"
],
    life_simulation: "西川原駅から歩いて5分で校門へ。操山の緑を望む教室で探究ゼミや討論を行い、放課後は部活に汗を流して自習室で勉強します。",
    parent_summary: "【教育方針・進学】岡山県公立一貫校の先駆校。独自探究「未来航路」を通じて主体性と問題解決力を育成し、京大・阪大・岡山大医学部等へ抜群の合格実績を維持しています。【環境・費用】西川原駅徒歩5分。公立のため授業料無償。",
    child_summary: "岡山駅から電車で1駅、駅から歩いて5分でとても近い！自然がキレイな操山のふもとで、優しい仲間と楽しい探究や部活ができるよ！",
    tags: ["interest_history_culture", "interest_nature_biology", "interest_puzzle_math"],
    interest_category_label: "未来航路・岡山名門公立",
    is_favorite: false
  },
  {
    school_id: "sch_kenritsu_hiroshima",
    name: "広島県立広島中学校",
    name_ruby: "ひろしまけんりつひろしまちゅうがっこう",
    official_url: "http://www.hcyuko.hiroshima-c.ed.jp/",
    catchphrase: "「高い知性・豊かな感性・強い意志」。西条の学術拠点で世界を拓く全県学区公立校",
    recommend_phrase: "★ 東広島の学術環境で、広大なキャンパスと充実した寮も備え、世界水準の探究に取り組みたい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "広島県",
    district: "東広島市高屋町中島",
    station_name: "西高屋駅",
    access_info: {
      primary_line: "JR山陽本線",
      hub_station: "広島駅・西条駅・三原駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR山陽本線「西高屋駅」より徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（全寮制併設・中高一貫課程）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "国際リーダー・学術探究",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "東京大学・京都大学・広島大学医学部・大阪大学等へ毎年多数進学",
    events: [
      {
            "id": "ev_khiro_1",
            "title": "学校説明会・寮見学会",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "広大なキャンパスと全県から生徒が集まる寄宿舎を見学できます。"
      }
],
    special_classes: [
      {
            "title": "ことばの教育＆広島大学連携サイエンス",
            "desc": "論理的文章表現を鍛えることばの指導と、先端大学研究室との合同探究！"
      }
],
    school_strengths: [
      "広島県全域から受検可能！快適な学生寮も完備！",
      "広島大学等と連携した先端科学・国際教育プログラム！",
      "難関国公立大学・医学部への安定した高い進学実績！"
],
    life_simulation: "西高屋駅から緑の並木道を歩いて登校。寮生も通学生も仲間同士で深く学び合い、放課後は部活動や夜間学習に励みます。",
    parent_summary: "【教育方針・進学】広島県が全県から英才を集める県立中高一貫校。徹底した論理的言語教育と大学連携探究により、東大・京大・広大医学部へ安定した多数の合格者を輩出。安心の学生寮も完備。【環境・費用】東広島市。公立のため学費負担が極めて抑えられます。",
    child_summary: "広島県中から頼もしい仲間が集まる！寮もあるから遠くからでも安心。英語のスピーチや科学の実験を仲間と楽しく究められるよ！",
    tags: ["interest_science_space", "interest_puzzle_math", "interest_drawing_create"],
    interest_category_label: "全県公立一貫・学術連携",
    is_favorite: false
  },
  {
    school_id: "sch_johnouchi",
    name: "徳島県立城ノ内中等教育学校",
    name_ruby: "とくしまけんりつじょうのうちちゅうとうきょういくがっこう",
    official_url: "https://johnouchi-ss.tokushima-ec.ed.jp/",
    catchphrase: "「自主・誠実・礼学」。四国を牽引する中等教育学校から難関大・医学部へ",
    recommend_phrase: "★ 徳島県最高峰の学習環境で、仲間と競い合いながら国公立医学部や難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "徳島県",
    district: "徳島市北徳島町",
    station_name: "徳島駅",
    access_info: {
      primary_line: "JR高徳線・徳島線・牟岐線",
      hub_station: "徳島駅",
      walk_minutes: 10,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR「徳島駅」より徒歩10分"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "中等教育課程（6年一貫）",
    commute_time: 20,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "徳島最高峰・医学部難関大",
    club_label: "盛ん",
    record_label: "◎",
    deviation_score: 58,
    match_rate_child: 92,
    recent_passed_records: "東京大学・京都大学・徳島大学医学部（毎年多数）・国公立大学へ高い進学実績",
    events: [
      {
            "id": "ev_johno_1",
            "title": "城ノ内中等説明会",
            "date": "10月4日(土)",
            "type": "学校説明会",
            "desc": "中等教育学校移行による先取り指導と医学部進学指導を解説します。"
      }
],
    special_classes: [
      {
            "title": "城ノ内グローバルサイエンスゼミ",
            "desc": "徳島大学医学部・薬学部・LED産業と連携した先端探究プログラム！"
      }
],
    school_strengths: [
      "徳島駅徒歩10分の通学利便性と徳島県内トップクラスの偏差値！",
      "徳島大医学部をはじめ国公立大学医学部に抜群の合格実績！",
      "中等教育学校化による6年一貫の体系的先取りカリキュラム！"
],
    life_simulation: "徳島駅から歩いて10分。熱意ある仲間とハイレベルな講義を受け、放課後は部活に汗を流し、自習室で医学部や難関大を目指して勉強します。",
    parent_summary: "【教育方針・進学】徳島県を代表する公立中等教育学校。地元徳島大医学部をはじめとする難関医学部・難関国立大に圧倒的な実績を誇ります。【環境・費用】徳島駅至近の好立地。公立のため授業料無償。",
    child_summary: "徳島駅から近くて通いやすい！お医者さんや科学者になりたい頼もしい友達がたくさんいて、勉強も部活動も全力で打ち込めるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_sports_outdoor"],
    interest_category_label: "四国最高峰・医学部特化",
    is_favorite: false
  },
  {
    school_id: "sch_munakata_jh",
    name: "福岡県立宗像中学校",
    name_ruby: "ふくおかけんりつむなかたちゅうがっこう",
    official_url: "https://munakata-j.fku.ed.jp/",
    catchphrase: "世界遺産の地で学ぶ「自律・創造・敬愛」。九州を牽引する公立中高一貫校",
    recommend_phrase: "★ 世界遺産・宗像の歴史と豊かな自然の中で、世界に目を向けた探究学習と九州大学進学を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "福岡県",
    district: "宗像市東郷",
    station_name: "東郷駅",
    access_info: {
      primary_line: "JR鹿児島本線",
      hub_station: "博多駅・小倉駅・折尾駅",
      walk_minutes: 15,
      bus_minutes: 0,
      school_bus: false,
      school_bus_note: "JR鹿児島本線「東郷駅」日の里口より徒歩15分（または西鉄バス約5分）"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "普通科（中高一貫課程）",
    commute_time: 30,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["both", "academics"],
    vibe_label: "世界遺産探究・文武両道",
    club_label: "非常に活発",
    record_label: "◎",
    deviation_score: 60,
    match_rate_child: 92,
    recent_passed_records: "九州大学・東京大学・京都大学・国公立大学医学部へ高い現役進学率",
    events: [
      {
            "id": "ev_muna_1",
            "title": "学校説明会・公開授業",
            "date": "10月11日(土)",
            "type": "学校説明会",
            "desc": "宗像中独自のグローバル探究活動と6年一貫指導をご案内します。"
      }
],
    special_classes: [
      {
            "title": "宗像世界遺産探究＆グローバルリーダーシップ",
            "desc": "神宿る島・宗像大社を起点に古代からの国際交流と海洋環境を調査・研究！"
      }
],
    school_strengths: [
      "JR鹿児島本線快速停車駅・東郷駅至近！博多・北九州両方面から通学至便！",
      "世界遺産の歴史と自然に抱かれた素晴らしい教育環境！",
      "九州大学をはじめとする難関国公立大学への高い現役合格実績！"
],
    life_simulation: "東郷駅から歩いて登校。歴史と自然の風を感じながら探究授業を受け、放課後は部活に打ち込み、充実した自習室で勉強します。",
    parent_summary: "【教育方針・進学】福岡県立の中高一貫進学校。世界遺産の地域資源を活かした高度な探究学習と確かな基礎学力指導により、九大・難関国立大に安定した多数の合格者を輩出。【環境・費用】宗像市東郷。公立のため授業料無償。",
    child_summary: "世界遺産の宗像大社の近くにあるきれいな学校！自然の中で歴史や科学を調べて発表したり、部活もみんなで思いきり楽しめるよ！",
    tags: ["interest_history_culture", "interest_nature_biology", "interest_sports_outdoor"],
    interest_category_label: "世界遺産・九州名門公立",
    is_favorite: false
  },
  {
    school_id: "sch_kaiho_jh",
    name: "沖縄県立開邦中学校",
    name_ruby: "おきなわけんりつかいほうちゅうがっこう",
    official_url: "http://www.kaiho-jh.open.ed.jp/",
    catchphrase: "沖縄公立の最高峰。「開邦精神」で東大・京大・医学部へ挑む英才の学び舎",
    recommend_phrase: "★ 沖縄最高峰の知性が集まる環境で、学問の真理をとことん追究し、医学部や難関大を目指したい人におすすめ！",
    photo_url: "assets/images/real_shibushibu.jpg",
    prefecture: "沖縄県",
    district: "島尻郡南風原町新川",
    station_name: "首里駅",
    access_info: {
      primary_line: "沖縄都市モノレール（ゆいレール）・那覇バス",
      hub_station: "県庁前駅・首里駅",
      walk_minutes: 15,
      bus_minutes: 5,
      school_bus: false,
      school_bus_note: "ゆいレール「首里駅」より徒歩15分、那覇バス「開邦高校前」下車すぐ"
    },
    can_walk: true,
    can_bicycle: true,
    course_name: "学術探究科（中高一貫課程）",
    commute_time: 25,
    tuition: 150000,
    gender_type: "coed",
    category: "public",
    religion: "none",
    university_path: "prep",
    atmospheres: ["stem", "academics"],
    vibe_label: "沖縄最高峰・英才探究",
    club_label: "活発",
    record_label: "◎",
    deviation_score: 62,
    match_rate_child: 94,
    recent_passed_records: "琉球大学医学部医学科・東京大学・京都大学・国公立大学へ圧倒的合格実績",
    events: [
      {
            "id": "ev_kaiho_1",
            "title": "学校説明会・開邦サイエンス公開",
            "date": "10月18日(土)",
            "type": "学校説明会",
            "desc": "中高一貫の先取りカリキュラムと高度な探究授業を公開します。"
      }
],
    special_classes: [
      {
            "title": "開邦学術リサーチ＆OIST（沖縄科学技術大学院大学）連携",
            "desc": "世界屈指の研究機関OIST等の研究者と協働する最先端科学研究！"
      }
],
    school_strengths: [
      "沖縄県公立校ナンバーワンの進学実績！琉球大医学部・東大に圧倒的！",
      "OIST（沖縄科学技術大学院大学）など先端機関と直結した研究環境！",
      "首里城近くの高台に位置し、那覇市内各所からアクセス至便！"
],
    life_simulation: "首里駅から登校。高い目標を掲げる仲間たちと実験や討論を行い、放課後は自習室で医学部や最難関大を目指して仲間と切磋琢磨します。",
    parent_summary: "【教育方針・進学】沖縄県公立の頂点に立つ進学校。中高一貫化により先取り指導がさらに加速し、琉球大医学部や東大・京大へ県内圧倒的な合格実績を築いています。【環境・費用】首里エリア至近。公立のため授業料無償。",
    child_summary: "沖縄で一番勉強ができるすごい友達が集まる学校！宇宙やバイオの最先端の実験をしたり、医学部を目指して楽しく学べるよ！",
    tags: ["interest_puzzle_math", "interest_science_space", "interest_nature_biology"],
    interest_category_label: "沖縄最高峰・医学部先端探究",
    is_favorite: false
  }
];

// ==========================================
// 住所・最寄り駅から47都道府県を高精度に特定する判定エンジン
// ==========================================
function detectPrefectureFromAddressAndStation(userAddress, userStation) {
  const text = `${userAddress || ""} ${userStation || ""}`.trim();
  if (!text) return "東京都";

  const allPrefs = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];
  for (const pref of allPrefs) {
    if (text.includes(pref)) return pref;
  }

  // 市区町村名・主要駅名からの高精度都道府県特定辞書
  const cityStationMap = [
    // 茨城県（土浦・荒川沖・つくば・取手・水戸など）
    { pattern: /土浦|荒川沖|つくば|水戸|取手|牛久|守谷|ひたちなか|日立|石岡|かすみがうら|古河|神栖|龍ケ崎|常総|坂東|結城|那珂|常陸太田|笠間|下妻/, pref: "茨城県" },
    // 栃木県
    { pattern: /宇都宮|佐野|小山|足利|栃木市|那須|日光|鹿沼|真岡|大田原|さくら市|矢板/, pref: "栃木県" },
    // 群馬県
    { pattern: /前橋|高崎|太田|伊勢崎|桐生|渋川|館林|藤岡|富岡|安中|沼田/, pref: "群馬県" },
    // 埼玉県
    { pattern: /さいたま|大宮|浦和|与野|川口|所沢|川越|越谷|草加|春日部|熊谷|上尾|新座|久喜|狭山|深谷|戸田|朝霞|志木|和光|富士見|ふじみ野|坂戸|東松山|八潮|三郷|吉川/, pref: "埼玉県" },
    // 千葉県
    { pattern: /千葉市|船橋|市川|松戸|柏|市原|八千代|流山|佐倉|習志野|浦安|野田|木更津|成田|我孫子|鎌ケ谷|君津|幕張|新浦安|舞浜|津田沼|西船橋|海浜幕張|南流山/, pref: "千葉県" },
    // 神奈川県
    { pattern: /横浜|川崎|相模原|横須賀|藤沢|平塚|茅ヶ崎|厚木|大和|小田原|鎌倉|秦野|座間|海老名|伊勢原|逗子|綾瀬|武蔵小杉|新横浜|戸塚|上大岡|たまプラーザ|日吉|溝の口|あざみ野/, pref: "神奈川県" },
    // 東京都
    { pattern: /千代田|中央区|港区|新宿|文京|台東|墨田|江東|品川|目黒|大田区|世田谷|渋谷|中野|杉並|豊島|北区|荒川|板橋|練馬|足立|葛飾|江戸川|八王子|町田|府中|調布|西東京|武蔵野|三鷹|立川|吉祥寺|国分寺|国立|小金井|小平|日野|多摩/, pref: "東京都" },
    // 静岡県
    { pattern: /静岡市|浜松|富士市|沼津|磐田|焼津|藤枝|富士宮|掛川|三島|島田|御殿場|袋井|熱海|伊東/, pref: "静岡県" },
    // 愛知県
    { pattern: /名古屋|一宮|豊田|岡崎|豊橋|春日井|安城|豊川|西尾|刈谷|小牧|稲沢|瀬戸|半田|東海市|江南|日進|あま市|みよし|栄|名駅|金山|千種/, pref: "愛知県" },
    // 岐阜県
    { pattern: /岐阜市|大垣|各務原|多治見|可児|高山|関市|中津川|羽島|瑞浪|恵那/, pref: "岐阜県" },
    // 三重県
    { pattern: /四日市|津市|鈴鹿|松阪|桑名|伊勢|伊賀|名張|亀山|一身田/, pref: "三重県" },
    // 大阪府
    { pattern: /大阪市|堺|東大阪|枚方|豊中|高槻|吹田|茨木|八尾|寝屋川|岸和田|和泉|守口|門真|箕面|大東|松原|富田林|羽曳野|梅田|難波|天王寺|京橋|新大阪|千里/, pref: "大阪府" },
    // 兵庫県
    { pattern: /神戸|姫路|西宮|尼崎|明石|加古川|宝塚|伊丹|川西|三田|高砂|芦屋|豊岡|三木|三ノ宮|甲子園|西宮北口|岡本|御影|六甲/, pref: "兵庫県" },
    // 京都府
    { pattern: /京都市|宇治|亀岡|舞鶴|城陽|長岡京|福知山|八幡市|京田辺|木津川|烏丸|河原町|祇園|嵐山|桂/, pref: "京都府" },
    // 奈良県
    { pattern: /奈良市|橿原|生駒|大和郡山|香芝|大和高田|天理|桜井|葛城/, pref: "奈良県" },
    // 滋賀県
    { pattern: /大津|草津|長浜|東近江|彦根|甲賀|近江八幡|守山|栗東|野洲|高島/, pref: "滋賀県" },
    // 和歌山県
    { pattern: /和歌山市|田辺|橋本|紀の川|岩出|海南|紀三井寺/, pref: "和歌山県" },
    // 宮城県
    { pattern: /仙台|石巻|大崎|登米|栗原|気仙沼|名取|多賀城|塩竈|富谷|岩沼/, pref: "宮城県" },
    // 福島県
    { pattern: /いわき|郡山|福島市|会津若松|須賀川|白河|伊達|本宮/, pref: "福島県" },
    // 山形県
    { pattern: /山形市|鶴岡|酒田|米沢|天童|東根|さくらんぼ東根|寒河江|新庄/, pref: "山形県" },
    // 岩手県
    { pattern: /盛岡|一関|奥州|花巻|北上|宮古|大船渡|釜石/, pref: "岩手県" },
    // 青森県
    { pattern: /青森市|八戸|弘前|十和田|むつ|五所川原|三沢/, pref: "青森県" },
    // 秋田県
    { pattern: /秋田市|横手|大仙|由利本荘|大館|能代|湯沢|羽後牛島/, pref: "秋田県" },
    // 新潟県
    { pattern: /新潟市|長岡|上越|三条|新発田|柏崎|燕市|村上|佐渡/, pref: "新潟県" },
    // 富山県
    { pattern: /富山市|高岡|射水|南砺|氷見|砺波|魚津|黒部/, pref: "富山県" },
    // 石川県
    { pattern: /金沢|白山|小松|加賀|七尾|野々市|かほく|東金沢/, pref: "石川県" },
    // 福井県
    { pattern: /福井市|坂井|越前|敦賀|鯖江|大野|小浜/, pref: "福井県" },
    // 山梨県
    { pattern: /甲府|甲斐|南アルプス|笛吹|富士吉田|北杜|山梨市|都留/, pref: "山梨県" },
    // 長野県
    { pattern: /長野市|松本|上田|飯田|佐久|安曇野|伊那|塩尻|諏訪|上諏訪|茅野|岡谷/, pref: "長野県" },
    // 広島県
    { pattern: /広島市|福山|呉市|東広島|尾道|廿日市|三原|三次|府中市/, pref: "広島県" },
    // 岡山県
    { pattern: /岡山市|倉敷|津山|総社|玉野|笠岡|真庭|赤磐|熊山/, pref: "岡山県" },
    // 山口県
    { pattern: /下関|山口市|宇部|周南|岩国|防府|山陽小野田|下松|光市|新山口|宇部新川/, pref: "山口県" },
    // 鳥取県
    { pattern: /鳥取市|米子|倉吉|境港|湯梨浜/, pref: "鳥取県" },
    // 島根県
    { pattern: /松江|出雲|浜田|益田|安来|雲南/, pref: "島根県" },
    // 徳島県
    { pattern: /徳島市|阿南|鳴門|吉野川|小松島|阿波市/, pref: "徳島県" },
    // 香川県
    { pattern: /高松|丸亀|三豊|観音寺|坂出|さぬき市|東かがわ/, pref: "香川県" },
    // 愛媛県
    { pattern: /松山市|今治|新居浜|西条|四国中央|宇和島|大洲/, pref: "愛媛県" },
    // 高知県
    { pattern: /高知市|南国|香南|四万十|土佐市|須崎|旭駅/, pref: "高知県" },
    // 福岡県
    { pattern: /福岡市|北九州|久留米|飯塚|大牟田|春日|糸島|筑紫野|宗像|太宰府|博多|天神|小倉|行橋|八女/, pref: "福岡県" },
    // 佐賀県
    { pattern: /佐賀市|唐津|鳥栖|伊万里|武雄|小城市|嬉野/, pref: "佐賀県" },
    // 長崎県
    { pattern: /長崎市|佐世保|諫早|大村|南島原|島原|時津/, pref: "長崎県" },
    // 熊本県
    { pattern: /熊本市|八代|天草|玉名|宇城|山鹿|合志|菊池|水前寺|健軍/, pref: "熊本県" },
    // 大分県
    { pattern: /大分市|別府|中津|日田|佐伯|宇佐|臼杵/, pref: "大分県" },
    // 宮崎県
    { pattern: /宮崎市|都城|延岡|日南|小林|日向|西都|南宮崎/, pref: "宮崎県" },
    // 鹿児島県
    { pattern: /鹿児島市|霧島|鹿屋|薩摩川内|姶良|出水|指宿|中央駅/, pref: "鹿児島県" },
    // 沖縄県
    { pattern: /那覇|沖縄市|うるま|浦添|宜野湾|名護|糸満|豊見城|南城|石垣|宮古島/, pref: "沖縄県" }
  ];

  for (const item of cityStationMap) {
    if (item.pattern.test(text)) {
      return item.pref;
    }
  }

  return "東京都";
}

// ==========================================
// 具体的通学ルート・交通手段・所要時間計算エンジン
// ==========================================
function calculateDetailedCommuteRoute(userAddress, userStation, school, allowedTransports) {
  const userAddr = (userAddress || "").trim();
  const uStation = (userStation || "").trim().replace(/駅$/, "");
  const sStation = (school.station_name || "").replace(/駅$/, "");
  const schoolPref = school.prefecture || "東京都";
  const schoolDistrict = school.district || "";
  const access = school.access_info || {};

  // 1. ユーザーの都道府県を特定（住所・駅名の両方から高精度判定）
  const userPref = detectPrefectureFromAddressAndStation(userAddr, uStation);
  const isSamePref = userPref === schoolPref;

  // 通学圏判定（同一通学クラスター内か）
  let isSameRegion = isSamePref;
  if (!isSameRegion) {
    for (const regionKey in COMMUTE_REGIONS) {
      const prefs = COMMUTE_REGIONS[regionKey];
      if (prefs.includes(userPref) && prefs.includes(schoolPref)) {
        isSameRegion = true;
        break;
      }
    }
  }

  // 通学手段の許可状況
  const transports = Array.isArray(allowedTransports) ? allowedTransports : ["train", "bicycle", "walk"];
  const allowTrain = transports.includes("train");
  const allowBus = transports.includes("bus") || transports.includes("school_bus");
  const allowBicycle = transports.includes("bicycle");
  const allowWalk = transports.includes("walk");

  // 市区町村の近接判定
  const isSameDistrict = userAddr.includes(schoolDistrict) || (schoolDistrict && userAddr.includes(schoolDistrict.replace(/[市区町村]$/, "")));

  // A. 徒歩通学のみ希望の場合
  if (allowWalk && !allowTrain && !allowBicycle) {
    if (isSameDistrict && school.can_walk) {
      const walkTime = Math.min(Math.max(access.walk_minutes || 12, 10), 18);
      return {
        total_minutes: walkTime,
        route_summary: `【徒歩通学】ご自宅（${userAddr}）より校門まで平坦な通学路を徒歩約${walkTime}分（徒歩圏内・安心通学）`,
        is_walk_bicycle: true,
        method_type: "walk",
        is_commutable: true
      };
    } else {
      return {
        total_minutes: 999,
        route_summary: `【徒歩圏外】ご自宅から徒歩で通学できる距離を超えています（公共交通機関または自転車のご利用が必要です）`,
        is_walk_bicycle: false,
        method_type: "unreachable",
        is_commutable: false
      };
    }
  }

  // B. 自転車通学（または徒歩＋自転車のみ）希望の場合
  if (!allowTrain && (allowBicycle || allowWalk)) {
    if (isSameDistrict || (isSamePref && school.can_bicycle)) {
      const bikeTime = isSameDistrict ? 14 : 22;
      return {
        total_minutes: bikeTime,
        route_summary: `【自転車通学】ご自宅（${userAddr}）より安全な自転車レーン経由で約${bikeTime}分（校内生徒用駐輪場完備・雨天時は路線バス併用可）`,
        is_walk_bicycle: true,
        method_type: "bicycle",
        is_commutable: true
      };
    } else {
      return {
        total_minutes: 999,
        route_summary: `【自転車通学圏外】ご自宅から自転車で安全に通学できる距離（約30分以内）を超えています`,
        is_walk_bicycle: false,
        method_type: "unreachable",
        is_commutable: false
      };
    }
  }

  // C. 遠隔地（通学圏外の別地方）
  if (!isSameRegion) {
    return {
      total_minutes: 240,
      route_summary: `【遠隔地・新幹線／全寮制】ご自宅（${userPref}）から片道所要時間約4時間以上（※日常の通学可能圏外・新幹線または寮生活対象）`,
      is_walk_bicycle: false,
      method_type: "remote",
      is_commutable: false
    };
  }

  // D. 公共交通機関（電車・路線バス・スクールバス）による具体的ルート計算
  const walkMin = access.walk_minutes || 7;
  const primaryLine = access.primary_line || "主要鉄道路線";

  // 1) スクールバス運行校の場合（最寄り駅・発着拠点駅からの直通または電車＋バス）
  if (access.school_bus) {
    const isDirectBusStation = (uStation && (uStation === sStation || (access.hub_station && access.hub_station.includes(uStation))));
    const busMin = access.bus_minutes || 12;

    if (isDirectBusStation) {
      const total = busMin + 2;
      return {
        total_minutes: total,
        route_summary: `【専用スクールバス直通】ご自宅最寄り「${uStation}駅」より学校専用直通スクールバスで約${busMin}分（乗換不要・校内直着で雨天も安心）※${access.school_bus_note || 'スクールバス運行'}`,
        is_walk_bicycle: false,
        method_type: "school_bus",
        is_commutable: true
      };
    } else {
      let trainMin = isSamePref ? 12 : 25;
      if (isSameDistrict) trainMin = 6;
      const total = trainMin + busMin;
      return {
        total_minutes: total,
        route_summary: `【電車＋スクールバス直通】「${uStation || '自宅最寄駅'}駅」より ${primaryLine} 等で約${trainMin}分 →「${sStation}駅」下車、学校専用スクールバス直通 約${busMin}分（合計所要時間：約${total}分）※${access.school_bus_note || 'スクールバス運行'}`,
        is_walk_bicycle: false,
        method_type: "school_bus",
        is_commutable: true
      };
    }
  }

  // 2) 最寄り駅が同一（直近・徒歩圏）の場合
  if (uStation && (uStation === sStation || sStation.includes(uStation) || uStation.includes(sStation))) {
    const total = walkMin + 2;
    return {
      total_minutes: total,
      route_summary: `【駅近・徒歩】ご自宅最寄り「${uStation}駅」から学校最寄り「${sStation}駅」まで直通、駅から校門まで徒歩約${walkMin}分（合計所要時間：約${total}分）`,
      is_walk_bicycle: false,
      method_type: "train",
      is_commutable: true
    };
  }

  // 3) 同一都道府県内の電車移動
  if (isSamePref) {
    let trainMin = 18;
    if (isSameDistrict) trainMin = 10;
    const total = trainMin + walkMin;
    return {
      total_minutes: total,
      route_summary: `【電車直通＋徒歩】ご自宅最寄り「${uStation || '自宅最寄駅'}駅」より ${primaryLine} 等で約${trainMin}分 →「${sStation}駅」下車 徒歩約${walkMin}分（合計所要時間：約${total}分）`,
      is_walk_bicycle: false,
      method_type: "train",
      is_commutable: true
    };
  }

  // 4) 地域間・都道府県間のリアルな鉄道移動時間計算
  // 茨城県からの各地域への所要時間
  let crossTrainMin = 50;
  let hubStation = access.hub_station || "主要乗換駅";
  let transferNote = "JR線等乗換";

  if (userPref === "茨城県") {
    // 茨城県（土浦・荒川沖・水戸・つくば等）から他県への所要時間
    if (schoolPref === "東京都") {
      // 城北・常磐線直通（日暮里・西日暮里・北千住等）
      if (sStation.includes("日暮里") || sStation.includes("千住") || schoolDistrict.includes("荒川区") || schoolDistrict.includes("足立区")) {
        crossTrainMin = 50;
        hubStation = "日暮里駅";
        transferNote = "常磐線快速直通";
      } else if (schoolDistrict.includes("千代田区") || schoolDistrict.includes("文京区") || sStation.includes("水道橋") || sStation.includes("御茶ノ水") || sStation.includes("東京")) {
        // 都心部（文京区・千代田区など）
        crossTrainMin = 68;
        hubStation = "上野・秋葉原駅";
        transferNote = "JR常磐線＋JR山手線・地下鉄線";
      } else {
        // 城西・城南（渋谷区・新宿区・世田谷区・港区など：片道80〜95分）
        crossTrainMin = 82;
        hubStation = "上野・日暮里駅";
        transferNote = "JR常磐線＋山手線または東京メトロ線";
      }
    } else if (schoolPref === "千葉県") {
      // 東葛（柏・松戸・我孫子・流山）
      if (sStation.includes("柏") || sStation.includes("松戸") || sStation.includes("我孫子") || schoolDistrict.includes("柏") || schoolDistrict.includes("松戸")) {
        crossTrainMin = 25;
        hubStation = "柏駅";
        transferNote = "JR常磐線快速直通";
      } else {
        // 千葉市・幕張・船橋など
        crossTrainMin = 70;
        hubStation = "新松戸・西船橋駅";
        transferNote = "JR常磐線＋武蔵野線または総武線";
      }
    } else if (schoolPref === "埼玉県") {
      crossTrainMin = 75;
      hubStation = "南流山・大宮駅";
      transferNote = "JR常磐線＋武蔵野線・JR線";
    } else if (schoolPref === "神奈川県") {
      crossTrainMin = 95;
      hubStation = "上野・東京・横浜駅";
      transferNote = "上野東京ライン直通＋JR根岸線・私鉄線";
    } else if (schoolPref === "栃木県" || schoolPref === "群馬県") {
      crossTrainMin = 75;
      hubStation = "小山・友部駅";
      transferNote = "水戸線・両毛線";
    }
  } else if (userPref === "神奈川県") {
    if (schoolPref === "東京都") {
      crossTrainMin = schoolDistrict.includes("世田谷") || schoolDistrict.includes("渋谷") || schoolDistrict.includes("品川") ? 25 : 45;
      hubStation = "品川・渋谷駅";
    } else if (schoolPref === "埼玉県" || schoolPref === "千葉県") {
      crossTrainMin = 70;
      hubStation = "東京・新宿駅";
    } else if (schoolPref === "茨城県") {
      crossTrainMin = 100;
      hubStation = "東京・上野駅";
    }
  } else if (userPref === "埼玉県") {
    if (schoolPref === "東京都") {
      crossTrainMin = schoolDistrict.includes("豊島") || schoolDistrict.includes("北区") ? 25 : 45;
      hubStation = "池袋・上野駅";
    } else if (schoolPref === "千葉県" || schoolPref === "神奈川県") {
      crossTrainMin = 65;
      hubStation = "武蔵浦和・赤羽駅";
    } else if (schoolPref === "茨城県") {
      crossTrainMin = 75;
      hubStation = "南流山・柏駅";
    }
  } else if (userPref === "千葉県") {
    if (schoolPref === "東京都") {
      crossTrainMin = 40;
      hubStation = "錦糸町・東京駅";
    } else if (schoolPref === "茨城県") {
      crossTrainMin = 45;
      hubStation = "柏・松戸駅";
    } else if (schoolPref === "神奈川県") {
      crossTrainMin = 75;
      hubStation = "東京駅";
    }
  }

  const totalCross = crossTrainMin + walkMin;

  return {
    total_minutes: totalCross,
    route_summary: `【電車乗換＋徒歩】ご自宅最寄り「${uStation || '自宅最寄駅'}駅」より ${transferNote}で約${crossTrainMin}分（${hubStation}経由）→「${sStation}駅」下車 徒歩約${walkMin}分（合計所要時間：約${totalCross}分）`,
    is_walk_bicycle: false,
    method_type: "train",
    is_commutable: totalCross <= 90
  };
}
