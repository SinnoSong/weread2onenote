# Weread2OneNote

微信读书笔记同步OneNote

接口：

- https://i.weread.qq.com/user/notebooks  
  ```curl "https://i.weread.qq.com/user/notebooks" ^
  -H "authority: i.weread.qq.com" ^
  -H "accept: */*" ^
  -H "accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5" ^
  -H "cookie: wr_gid=249166046; wr_vid=201889962; wr_pf=0; wr_rt=web^%^40c9naVs53YWlq29eyeVp_AL; wr_localvid=fcf32fa07c0898aafcf39d2; wr_name=^%^E5^%^B0^%^8F^%^E7^%^99^%^BD^%^E3^%^80^%^82; wr_gender=1; wr_theme=white; pac_uid=0_8044050ff3bc9; pgv_pvid=688448218; tvfe_boss_uuid=2194da3aafa11c1d; ptui_loginuin=2682457187; RK=LS/dlVFt+W; ptcz=dafec6d72b38c4d7db9e15fc76ce2642989f0913d965e0b3e4100cd6e74e72ae; wr_avatar=https^%^3A^%^2F^%^2Fthirdwx.qlogo.cn^%^2Fmmopen^%^2Fvi_32^%^2FGDYkD2X7pXRFvfJDH9FK72DNBm0icXCPKh07kcdwaoxlibYRlkpu5xaMIRCwV7HTh6PFz48uo8xnb0KBV7Sz2BFg^%^2F132; qq_domain_video_guid_verify=dc5b747a49964fba; iip=0; wr_fp=676174869; wr_skey=_aKCYD9f" ^
  -H "dnt: 1" ^
  -H "origin: https://weread.qq.com" ^
  -H "referer: https://weread.qq.com/" ^
  -H "sec-ch-ua: ^\^"Not/A)Brand^\^";v=^\^"99^\^", ^\^"Microsoft Edge^\^";v=^\^"115^\^", ^\^"Chromium^\^";v=^\^"115^\^"" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "sec-ch-ua-platform: ^\^"Windows^\^"" ^
  -H "sec-fetch-dest: empty" ^
  -H "sec-fetch-mode: cors" ^
  -H "sec-fetch-site: same-site" ^
  -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188" ^
  --compressed```
- https://i.weread.qq.com/book/bookmarklist?bookId=41516087  
  ```curl "https://i.weread.qq.com/book/bookmarklist?bookId=41516087" ^
  -H "authority: i.weread.qq.com" ^
  -H "accept: */*" ^
  -H "accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5" ^
  -H "cookie: wr_gid=249166046; wr_vid=201889962; wr_pf=0; wr_rt=web^%^40c9naVs53YWlq29eyeVp_AL; wr_localvid=fcf32fa07c0898aafcf39d2; wr_name=^%^E5^%^B0^%^8F^%^E7^%^99^%^BD^%^E3^%^80^%^82; wr_gender=1; wr_theme=white; pac_uid=0_8044050ff3bc9; pgv_pvid=688448218; tvfe_boss_uuid=2194da3aafa11c1d; ptui_loginuin=2682457187; RK=LS/dlVFt+W; ptcz=dafec6d72b38c4d7db9e15fc76ce2642989f0913d965e0b3e4100cd6e74e72ae; wr_avatar=https^%^3A^%^2F^%^2Fthirdwx.qlogo.cn^%^2Fmmopen^%^2Fvi_32^%^2FGDYkD2X7pXRFvfJDH9FK72DNBm0icXCPKh07kcdwaoxlibYRlkpu5xaMIRCwV7HTh6PFz48uo8xnb0KBV7Sz2BFg^%^2F132; qq_domain_video_guid_verify=dc5b747a49964fba; iip=0; wr_fp=676174869; wr_skey=_aKCYD9f" ^
  -H "dnt: 1" ^
  -H "origin: https://weread.qq.com" ^
  -H "referer: https://weread.qq.com/" ^
  -H "sec-ch-ua: ^\^"Not/A)Brand^\^";v=^\^"99^\^", ^\^"Microsoft Edge^\^";v=^\^"115^\^", ^\^"Chromium^\^";v=^\^"115^\^"" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "sec-ch-ua-platform: ^\^"Windows^\^"" ^
  -H "sec-fetch-dest: empty" ^
  -H "sec-fetch-mode: cors" ^
  -H "sec-fetch-site: same-site" ^
  -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188" ^
  --compressed```
- https://i.weread.qq.com/review/list?bookId=41516087&listType=11&mine=1&synckey=0&listMode=0  
  ```curl "https://i.weread.qq.com/review/list?bookId=41516087&listType=11&mine=1&synckey=0&listMode=0" ^
  -H "authority: i.weread.qq.com" ^
  -H "accept: */*" ^
  -H "accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5" ^
  -H "cookie: wr_gid=249166046; wr_vid=201889962; wr_pf=0; wr_rt=web^%^40c9naVs53YWlq29eyeVp_AL; wr_localvid=fcf32fa07c0898aafcf39d2; wr_name=^%^E5^%^B0^%^8F^%^E7^%^99^%^BD^%^E3^%^80^%^82; wr_gender=1; wr_theme=white; pac_uid=0_8044050ff3bc9; pgv_pvid=688448218; tvfe_boss_uuid=2194da3aafa11c1d; ptui_loginuin=2682457187; RK=LS/dlVFt+W; ptcz=dafec6d72b38c4d7db9e15fc76ce2642989f0913d965e0b3e4100cd6e74e72ae; wr_avatar=https^%^3A^%^2F^%^2Fthirdwx.qlogo.cn^%^2Fmmopen^%^2Fvi_32^%^2FGDYkD2X7pXRFvfJDH9FK72DNBm0icXCPKh07kcdwaoxlibYRlkpu5xaMIRCwV7HTh6PFz48uo8xnb0KBV7Sz2BFg^%^2F132; qq_domain_video_guid_verify=dc5b747a49964fba; iip=0; wr_fp=676174869; wr_skey=_aKCYD9f" ^
  -H "dnt: 1" ^
  -H "origin: https://weread.qq.com" ^
  -H "referer: https://weread.qq.com/" ^
  -H "sec-ch-ua: ^\^"Not/A)Brand^\^";v=^\^"99^\^", ^\^"Microsoft Edge^\^";v=^\^"115^\^", ^\^"Chromium^\^";v=^\^"115^\^"" ^
  -H "sec-ch-ua-mobile: ?0" ^
  -H "sec-ch-ua-platform: ^\^"Windows^\^"" ^
  -H "sec-fetch-dest: empty" ^
  -H "sec-fetch-mode: cors" ^
  -H "sec-fetch-site: same-site" ^
  -H "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188" ^
  --compressed
  ```
