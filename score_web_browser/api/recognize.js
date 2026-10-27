export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'僅支援 POST'});
 if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'網站尚未設定 OPENAI_API_KEY'});
 try{
  const {image}=req.body||{};
  if(typeof image!=='string'||image.length>11_000_000||!/^data:image\/(png|jpeg|webp);base64,/.test(image))return res.status(400).json({error:'請提供小於 8MB 的 JPG/PNG/WebP 圖片'});
  const response=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',temperature:0,response_format:{type:'json_object'},messages:[{role:'system',content:'You transcribe music score images into playable note events. Return ONLY JSON object {"title":string,"voices":[{"name":string,"notes":[{"pitch":integer MIDI 0-127,"start":number nonnegative beats from beginning,"duration":number positive quarter-note beats}]}]}. Treat quarter note as 1 beat. Identify clefs carefully including alto clef, key signatures, accidentals, rhythms, chords, rests, simultaneous voices. Do not invent uncertain notes: omit them. No prose or markdown. For handwritten scores accuracy may be limited.'},{role:'user',content:[{type:'text',text:'Transcribe the visible score as accurately as possible, including simultaneous parts. If the score is unclear, return only notes you can confidently read.'},{type:'image_url',image_url:{url:image,detail:'high'}}]}]})});
  const payload=await response.json();if(!response.ok)return res.status(502).json({error:payload.error?.message||'AI 服務錯誤'});
  const text=payload.choices?.[0]?.message?.content;const data=JSON.parse(text);if(!Array.isArray(data.voices))throw Error('AI 回傳格式不正確');
  return res.status(200).json(data);
 }catch(e){return res.status(500).json({error:e.message||'辨識失敗'})}
}
