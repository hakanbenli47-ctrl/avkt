"use client";

import { useState } from "react";
import { useSiteLanguage } from "./LanguageProvider";

const googleMapsHref = "https://www.google.com/maps/place/%D0%90%D0%B4%D0%B2%D0%BE%D0%BA%D0%B0%D1%82+Avukat+Lawyer+Ruslana+Pasecinic/@36.8901531,30.6983124,17z/data=!4m8!3m7!1s0x14c38f05426f6c4d:0x2fc5d2d7c632aaff!8m2!3d36.8901531!4d30.6983124!9m1!1b1!16s%2Fg%2F11lrfz2hpn";

const googleReviews = [
  { author: "Elif Ely", text: "DÃ¼rÃ¼st Profesyonel Ã§ok ilgili, Ã§Ã¶zÃ¼m odaklÄ± avukat arayan herkese..." },
  { author: "Ğ•Ğ²Ğ³ĞµĞ½Ğ¸Ñ ĞšĞ¾ÑÑ‚ĞµĞ½ĞºĞ¾", text: "Ğ¥Ğ¾Ñ‡Ñƒ Ñ‰Ğ¸Ñ€Ğ¾ Ğ¿Ğ¾Ğ´ÑĞºÑƒĞ²Ğ°Ñ‚Ğ¸ Ğ ÑƒÑĞ»Ğ°Ğ½Ñ– Ğ·Ğ° Ğ¿Ñ€Ğ¾Ñ„ĞµÑÑ–Ğ¹Ğ½Ñƒ Ğ´Ğ¾Ğ¿Ğ¾Ğ¼Ğ¾Ğ³Ñƒ Ñ‚Ğ° Ğ¿Ñ–Ğ´Ñ‚Ñ€Ğ¸Ğ¼ĞºÑƒ." },
  { author: "mark silakov", text: "Ğ’ÑĞµ Ğ¿Ñ€Ğ¾Ğ·Ñ€Ğ°Ñ‡Ğ½Ğ¾, ĞºĞ¾Ğ½ĞºÑ€ĞµÑ‚Ğ½Ğ¾ Ğ¸ ÑÑĞ½Ğ¾!" },
  {
    author: "Erdal Karasoylu",
    text: `Avukat Ruslana HanÄ±m iÅŸinde son derece baÅŸarÄ±lÄ± olduÄŸunu, australia antalya arasÄ±nda hukuki boÅŸanma davamÄ±n sÃ¼recinde gÃ¶stermiÅŸ olduÄŸu olaÄŸanÃ¼stÃ¼ titiz Ã§alÄ±ÅŸmalarÄ±nÄ±n sonucunda sorunsuz boÅŸanmamÄ± saÄŸlamÄ±ÅŸtÄ±r. Samimi Ã§alÄ±ÅŸmalarÄ±ndan dolayÄ± teÅŸekkÃ¼r ederim.`,
  },
  {
    author: "Helen07",
    text: `Ã–NCELÄ°KLE ÅUNU BELÄ°RTMEK Ä°STERÄ°M GERÃ‡EKTEN GÃ–ZÃœNÃœZ KAPALI GÃœVENEBÄ°LECRÄÄ°NÄ°Z DÃœRÃœST BÄ°R AVUKAT OLDUGUNU. SÃ–YLEMRK Ä°STERÄ°M.DAHA UZUN SÃœRE TANIYORUM. BANA DA BÄ°RÃ‡OK KEZ AYDINLATTI HÄ°RÃ‡Ä°OK SAYESÄ°NE BÄ°LGÄ°LENDÄ°M BURDAN Ã‡OK TEÅEKKÃœR EDERÄ°M. VE HER ZAMAN Ä°ÅÄ°NDE BAÅARILI OLMASINI TEMENNÄ° EDERÄ°M. SAYGI VE SEVGÄ°LERğŸ™ğŸ™ğŸ™â¤ï¸ â€¦`,
  },
  {
    author: "Elena Udoviko",
    text: `Ä°yi ki kendisine baÅŸvurmuÅŸum. Bilgili, profesyonel ve son derece ilgili bir avukat. Her ÅŸeyi aÃ§Ä±k, anlaÅŸÄ±lÄ±r ve net bir ÅŸekilde anlatÄ±yor, detaylara Ã¶nem veriyor ve gÃ¼ven veriyor. AyrÄ±ca iletiÅŸimi Ã§ok gÃ¼zel ve son derece samimi bir insan. ProfesyonelliÄŸi ve insani yaklaÅŸÄ±mÄ± iÃ§in Ã§ok teÅŸekkÃ¼r ederim!`,
  },
  {
    author: "tuncer sÃ¶nen",
    text: `Ruslana hanÄ±m hem hukuki bilgi ve birikimi, hem birden fazla dile iliÅŸkin yetkinliÄŸi, hem mahkemeler nezdinde bilirkiÅŸiliÄŸi ve yeminli tercÃ¼manlÄ±k hizmetleri vermesi ve hem de dosyalardaki titizliÄŸi ve takipÃ§iliÄŸi Ã¶zellikleriyle Antalya'da Ã¶ne Ã§Ä±kan avukatlardandÄ±r. Ã‡Ã¶zÃ¼m odaklÄ± yaklaÅŸÄ±mÄ±, tecrÃ¼besi ve multidisipliner Ã§alÄ±ÅŸmasÄ± ile gÃ¼venebileceÄŸiniz ve endiÅŸesiz Ã§alÄ±ÅŸabileceÄŸiniz baÅŸarÄ±lÄ± bir avukattÄ±r.`,
  },
  {
    author: "Reo Kurumsal",
    text: `Reo Tesis YÃ¶netimi olarak hukuki sÃ¼reÃ§lerimizde kendisinden destek aldÄ±ÄŸÄ±mÄ±z, alanÄ±nda bilgili, Ã§Ã¶zÃ¼m odaklÄ± ve gÃ¼venilir bir avukat. SÃ¼reÃ§leri titizlikle takip etmesi, hÄ±zlÄ± geri dÃ¶nÃ¼ÅŸleri ve profesyonel yaklaÅŸÄ±mÄ± bizim iÃ§in oldukÃ§a deÄŸerli. Ã–zellikle site ve apartman yÃ¶netimleriyle ilgili hukuki konularda kendisini gÃ¶nÃ¼l rahatlÄ±ÄŸÄ±yla tavsiye ediyoruz. Ä°ÅŸ birliÄŸimizden son derece memnunuz.`,
  },
  {
    author: "Oktay Ã‡ELÄ°K",
    text: `ÅŸini gerÃ§ekten bilen, gÃ¼venilir ve Ã§Ã¶zÃ¼m odaklÄ± bir avukat. SÃ¼reÃ§ boyunca her konuda detaylÄ± bilgilendirme yaptÄ± ve sorularÄ±mÄ±za hÄ±zlÄ± bir ÅŸekilde dÃ¶nÃ¼ÅŸ saÄŸladÄ±. ProfesyonelliÄŸi, ilgisi ve yaklaÅŸÄ±mÄ± sayesinde kendimizi gÃ¼vende hissettik. Hukuki bir konuda destek arayan herkese gÃ¶nÃ¼l rahatlÄ±ÄŸÄ±yla tavsiye ederim. BaÅŸarÄ±larÄ±nÄ±n devamÄ±nÄ± dilerim.`,
  },
  { author: "Suleyman Kullar", text: `Ä°ÅŸinde uzman dÃ¼rÃ¼st ve Ã§alÄ±ÅŸkan gÃ¼venle Ã§alÄ±ÅŸa bilirsiniz` },
  {
    author: "Muhammet KaÃ§maz",
    text: `Sn. Av. Ruslana hanÄ±m,

Emsalsiz gÃ¼zelliÄŸi ve hanÄ±mlÄ±ÄŸÄ± bir yana...

Bu gÃ¼ne kadar tanÄ±dÄ±ÄŸÄ±m
Cesur, Azimli, Ã‡alÄ±ÅŸkan, AÃ§Ä±k sÃ¶zlÃ¼
ve En dÃ¼rÃ¼st nadide Avukatlardan biridir.

Kendilerine,
Olmaz denilen davalarÄ±mÄ±zÄ± Oldurup,
Bize saÄŸladÄ±ÄŸÄ± tÃ¼m katkÄ±lardan Ã¶tÃ¼rÃ¼
ne kadar teÅŸekkÃ¼r etsek azdÄ±r.ğŸ™

AslÄ±nda Ruslana hanÄ±m,
BaÅŸta Antalya Barosu olmak Ã¼zere.
TÃ¼m Antalya halkÄ± iÃ§in bir ÅŸans, bir deÄŸerdir.
UmarÄ±m bu DeÄŸerin kÄ±ymeti bilinir..

Adaletin temsili ve tecellisi hususunda Ã§Ä±ktÄ±ÄŸÄ± bu kutsal yolda Kendisine Azim, Kudret ve BaÅŸarÄ±larÄ±nÄ±n devamÄ±nÄ± diliyorum.`,
  },
  {
    author: "Murat Yagiz",
    text: `Otomatik kapÄ± sektÃ¶rÃ¼nde hizmet vermekte olan ÅŸirketimizin hukuki sÃ¼reÃ§lerinde SayÄ±n Ruslana HanÄ±m ile Ã§alÄ±ÅŸma fÄ±rsatÄ±mÄ±z oldu. Kendisinin etkin ve hÄ±zlÄ± Ã§Ã¶zÃ¼mleriyle bizlere Ã§ok faydasÄ± oldu. Bu baÄŸlamda Ã§ok teÅŸekkÃ¼r eder, baÅŸarÄ±larÄ±nÄ±n devamÄ±nÄ± dileriz.`,
  },
  {
    author: "Maria Varici",
    text: `Am cunoscut-o pe doamna Ruslana Ã®n urmÄƒ cu aproximativ 6 ani, prin intermediul Consulatului Onorific al Republicii Moldova. La acea vreme, dÃ¢nsa s-a ocupat de procesul meu de divorÈ› È™i m-a ajutat sÄƒ finalizez divorÈ›ul. Am fost foarte mulÈ›umitÄƒ de colaborarea cu dÃ¢nsa. De atunci, ori de cÃ¢te ori am avut nevoie de ajutor sau un sfat Ã®n probleme juridice, m-a ajutat Ã®ntotdeauna cu multÄƒ rÄƒbdare.

De asemenea, m-a ajutat Ã®n procesul de cÄƒsÄƒtorie cu un cetÄƒÈ›ean turc. S-a ocupat de toate documentele È™i procedurile oficiale, de toate â€hÃ¢rtiile È™i acteleâ€ necesare.

Anul trecut, din pÄƒcate, am fost dusÄƒ la un Centru de ReÈ›inere È™i Expulzare. DatoritÄƒ tuturor eforturilor doamnei Ruslana, dupÄƒ aproximativ o lunÄƒ È™i jumÄƒtate am reuÈ™it sÄƒ mÄƒ Ã®ntorc la copiii mei. A reuÈ™it sÄƒ anuleze decizia de deportare, iar acum pot rÄƒmÃ¢ne Ã®n Turcia fÄƒrÄƒ probleme.

Ãn plus, paÈ™aportul copilului meu, care nu este cetÄƒÈ›ean turc, expirase. DupÄƒ multe dificultÄƒÈ›i, am reuÈ™it sÄƒ depunem cererea pentru un nou paÈ™aport. Fiind un avocat care vorbeÈ™te mai multe limbi, doamna Ruslana poate ajuta foarte bine persoane de diferite naÈ›ionalitÄƒÈ›i.

Vreau sÄƒ Ã®i mulÈ›umesc din suflet pentru tot ajutorul oferit. O recomand cu toatÄƒ Ã®ncrederea tuturor celor care au nevoie de un avocat serios È™i de Ã®ncredere.`,
  },
  {
    author: "NATA S",
    text: `*Ğ”Ğ¾Ğ±Ñ€Ñ‹Ğ¹ Ğ´ĞµĞ½ÑŒ Ğ²ÑĞµĞ¼!*

Ğ¡ Ğ ÑƒÑĞ»Ğ°Ğ½Ğ¾Ğ¹ Ñ Ğ¿Ğ¾Ğ·Ğ½Ğ°ĞºĞ¾Ğ¼Ğ¸Ğ»Ğ°ÑÑŒ ĞµÑ‰Ñ‘ Ğ² Ğ¿Ğ°Ğ½Ğ´ĞµĞ¼Ğ¸Ñ, Ğ² ÑĞ¿Ğ¸ÑĞºĞµ Ğ°Ğ´Ğ²Ğ¾ĞºĞ°Ñ‚Ğ¾Ğ² Ğ¿Ñ€Ğ¸ ĞºĞ¾Ğ½ÑÑƒĞ»ÑŒÑÑ‚Ğ²Ğµ. Ğ¢Ğ¾Ğ³Ğ´Ğ° Ğ¾Ğ½Ğ° Ğ¿Ğ¾Ğ¼Ğ¾Ğ³Ğ»Ğ° Ğ¼Ğ¾ĞµĞ¹ Ğ¿Ğ¾Ğ´Ñ€ÑƒĞ³Ğµ â€” Ğ±Ñ‹Ğ»Ğ° Ğ·Ğ°Ñ‰Ğ¸Ñ‚Ğ½Ğ¸ĞºĞ¾Ğ¼ Ğ² ÑÑƒĞ´Ğµ Ğ¸ Ğ²Ñ‹Ğ¸Ğ³Ñ€Ğ°Ğ»Ğ° Ğ´ĞµĞ»Ğ¾. ĞŸĞ¾Ğ´Ñ€ÑƒĞ³Ñƒ Ğ¾Ğ¿Ñ€Ğ°Ğ²Ğ´Ğ°Ğ»Ğ¸.

Ğ’ ÑÑ‚Ğ¾Ğ¼ Ğ³Ğ¾Ğ´Ñƒ Ğ¿Ğ¾Ğ¼Ğ¾Ñ‰ÑŒ Ğ¿Ğ¾Ğ½Ğ°Ğ´Ğ¾Ğ±Ğ¸Ğ»Ğ°ÑÑŒ ÑƒĞ¶Ğµ Ğ¼Ğ½Ğµ. ĞœĞ¾Ğ¹ Ğ¼Ğ¾Ğ»Ğ¾Ğ´Ğ¾Ğ¹ Ñ‡ĞµĞ»Ğ¾Ğ²ĞµĞº Ğ¿Ğ¾Ğ¿Ğ°Ğ» Ğ² Ğ±ĞµĞ´Ñƒ, Ğ° ĞµĞ³Ğ¾ ÑĞµĞ¼ÑŒÑ Ğ¾Ñ‚ĞºĞ°Ğ·Ğ°Ğ»Ğ°ÑÑŒ Ğ¾Ñ‚ ÑƒÑĞ»ÑƒĞ³ Ğ»ÑĞ±Ñ‹Ñ… Ğ°Ğ´Ğ²Ğ¾ĞºĞ°Ñ‚Ğ¾Ğ². ĞĞ¾ Ğ´Ğ»Ñ Ğ¼ĞµĞ½Ñ ÑÑ‚Ğ¾ Ğ½Ğµ ÑÑ‚Ğ°Ğ»Ğ¾ Ğ¿Ñ€ĞµĞ³Ñ€Ğ°Ğ´Ğ¾Ğ¹.

Ğ’ÑÑ‘, Ğ¾ Ñ‡Ñ‘Ğ¼ Ñ Ğ¿Ñ€Ğ¾ÑĞ¸Ğ»Ğ° Ğ ÑƒÑĞ»Ğ°Ğ½Ñƒ, Ğ¾Ğ½Ğ° Ğ²Ñ‹Ğ¿Ğ¾Ğ»Ğ½Ğ¸Ğ»Ğ° Ğ½Ğ° Ğ²Ñ‹ÑÑˆĞµĞ¼ Ğ¿Ñ€Ğ¾Ñ„ĞµÑÑĞ¸Ğ¾Ğ½Ğ°Ğ»ÑŒĞ½Ğ¾Ğ¼ ÑƒÑ€Ğ¾Ğ²Ğ½Ğµ. ĞĞ½Ğ° Ğ²Ñ‹Ğ»ĞµÑ‚ĞµĞ»Ğ° Ğ² Ğ´Ñ€ÑƒĞ³Ğ¾Ğ¹ Ğ³Ğ¾Ñ€Ğ¾Ğ´, Ğ¿Ñ€Ğ¸ÑˆĞ»Ğ° Ğ½Ğ° Ğ²ÑÑ‚Ñ€ĞµÑ‡Ñƒ Ğ² Ñ‚ÑÑ€ÑŒĞ¼Ñƒ, Ğ¿Ğ¾Ğ´Ğ³Ğ¾Ñ‚Ğ¾Ğ²Ğ¸Ğ»Ğ° Ğ²ÑĞµ Ğ½ĞµĞ¾Ğ±Ñ…Ğ¾Ğ´Ğ¸Ğ¼Ñ‹Ğµ Ğ´Ğ¾ĞºÑƒĞ¼ĞµĞ½Ñ‚Ñ‹. Ğš ÑĞ¾Ğ¶Ğ°Ğ»ĞµĞ½Ğ¸Ñ, Ğ½Ğ°ÑˆÑƒ Ğ¿Ğ¾Ğ¼Ğ¾Ñ‰ÑŒ Ğ² Ğ¸Ñ‚Ğ¾Ğ³Ğµ Ğ½Ğµ Ğ¿Ñ€Ğ¸Ğ½ÑĞ»Ğ¸.

ĞĞ¾ Ñ Ğ±ĞµĞ·Ğ¼ĞµÑ€Ğ½Ğ¾ Ğ±Ğ»Ğ°Ğ³Ğ¾Ğ´Ğ°Ñ€Ğ½Ğ° Ğ ÑƒÑĞ»Ğ°Ğ½Ğµ Ğ·Ğ° ĞµÑ‘ Ğ¿Ñ€Ğ¾Ñ„ĞµÑÑĞ¸Ğ¾Ğ½Ğ°Ğ»Ğ¸Ğ·Ğ¼, Ñ‡ĞµĞ»Ğ¾Ğ²ĞµÑ‡Ğ½Ğ¾ÑÑ‚ÑŒ Ğ¸ Ğ¶ĞµĞ½ÑĞºÑƒÑ ÑĞ¾Ğ»Ğ¸Ğ´Ğ°Ñ€Ğ½Ğ¾ÑÑ‚ÑŒ. Ğ ĞµĞºĞ¾Ğ¼ĞµĞ½Ğ´ÑƒÑ ĞµÑ‘ Ğ²ÑĞµĞ¼ ĞºĞ°Ğº Ğ¾Ñ‡ĞµĞ½ÑŒ ÑĞ¸Ğ»ÑŒĞ½Ğ¾Ğ³Ğ¾ Ğ¸ Ğ¿Ğ¾Ñ€ÑĞ´Ğ¾Ñ‡Ğ½Ğ¾Ğ³Ğ¾ Ğ°Ğ´Ğ²Ğ¾ĞºĞ°Ñ‚Ğ°.`,
  },
  {
    author: "Batyrzhan Smakov",
    text: `Ğ ÑƒÑĞ»Ğ°Ğ½Ğ° Ğ’Ğ¸ĞºÑ‚Ğ¾Ñ€Ğ¾Ğ²Ğ½Ğ° - ĞºĞ¾Ğ¼Ğ¿ĞµÑ‚ĞµĞ½Ñ‚Ğ½Ñ‹Ğ¹ Ğ¸ Ğ³Ñ€Ğ°Ğ¼Ğ¾Ñ‚Ğ½Ñ‹Ğ¹ ÑĞ¿ĞµÑ†Ğ¸Ğ°Ğ»Ğ¸ÑÑ‚. Ğ”Ğ¾Ğ²ĞµÑ€ÑĞµĞ¼ Ğ¸ Ğ±Ğ»Ğ°Ğ³Ğ¾Ğ´Ğ°Ñ€Ğ¸Ğ¼ Ğ·Ğ° Ğ¿Ğ¾Ğ¼Ğ¾Ñ‰ÑŒ! ğŸ‘ğŸ‘ğŸ‘ â€¦`,
  },
  {
    author: "ĞĞ»ĞµĞºÑ ĞŸ",
    text: `Ğ”Ğ°Ğ²Ğ½Ğ¾ ÑĞ¾Ñ‚Ñ€ÑƒĞ´Ğ½Ğ¸Ñ‡Ğ°Ñ Ñ Ğ ÑƒÑĞ»Ğ°Ğ½Ğ¾Ğ¹. ĞÑ‚Ğ»Ğ¸Ñ‡Ğ½Ñ‹Ğ¹ Ñ‡ĞµĞ»Ğ¾Ğ²ĞµĞº Ğ¸ Ğ¿Ñ€ĞµĞºÑ€Ğ°ÑĞ½Ñ‹Ğ¹ Ğ°Ğ´Ğ²Ğ¾ĞºĞ°Ñ‚. Ğ’Ğ¾Ğ¿Ñ€Ğ¾ÑÑ‹ Ñ€ĞµÑˆĞ°ĞµÑ‚ Ğ±Ñ‹ÑÑ‚Ñ€Ğ¾ Ğ¸ ĞºĞ°Ñ‡ĞµÑÑ‚Ğ²ĞµĞ½Ğ½Ğ¾. Ğ˜ÑĞºÑ€ĞµĞ½Ğ½Ğµ Ñ€ĞµĞºĞ¾Ğ¼ĞµĞ½Ğ´ÑƒÑ.`,
  },
  {
    author: "ĞÑ€Ğ»Ğ¾Ğ²Ğ° ĞœĞ°Ñ€Ğ¸Ñ",
    text: `Ğ¥Ğ¾Ñ‡Ñƒ Ğ²Ñ‹Ñ€Ğ°Ğ·Ğ¸Ñ‚ÑŒ Ğ¾Ğ³Ñ€Ğ¾Ğ¼Ğ½ÑƒÑ Ğ±Ğ»Ğ°Ğ³Ğ¾Ğ´Ğ°Ñ€Ğ½Ğ¾ÑÑ‚ÑŒ Ğ ÑƒÑĞ»Ğ°Ğ½Ğµ Ğ·Ğ° Ğ¿Ğ¾Ğ¼Ğ¾Ñ‰ÑŒ Ñ Ğ¾Ñ„Ğ¾Ñ€Ğ¼Ğ»ĞµĞ½Ğ¸ĞµĞ¼ Ğ’ĞĞ–! â¤ï¸ ĞĞ±Ñ€Ğ°Ñ‰Ğ°ÑÑÑŒ Ğº Ğ½ĞµĞ¹ ÑƒĞ¶Ğµ Ğ²Ñ‚Ğ¾Ñ€Ğ¾Ğ¹ Ñ€Ğ°Ğ·, Ğ¸ Ğ¾Ğ±Ğ° Ñ€Ğ°Ğ·Ğ° Ğ²ÑÑ‘ Ğ¿Ñ€Ğ¾ÑˆĞ»Ğ¾ ÑƒÑĞ¿ĞµÑˆĞ½Ğ¾ â€” Ğ’ĞĞ– Ğ¾Ğ´Ğ¾Ğ±Ñ€Ğ¸Ğ»Ğ¸. Ğ ÑƒÑĞ»Ğ°Ğ½Ğ° Ğ²ÑĞµĞ³Ğ´Ğ° Ğ½Ğ° ÑĞ²ÑĞ·Ğ¸, Ğ¿Ğ¾Ğ´Ñ€Ğ¾Ğ±Ğ½Ğ¾ Ğ¾Ğ±ÑŠÑÑĞ½ÑĞµÑ‚ ĞºĞ°Ğ¶Ğ´Ñ‹Ğ¹ ÑÑ‚Ğ°Ğ¿, Ğ¿Ğ¾Ğ¼Ğ¾Ğ³Ğ°ĞµÑ‚ Ñ Ğ´Ğ¾ĞºÑƒĞ¼ĞµĞ½Ñ‚Ğ°Ğ¼Ğ¸ Ğ¸ Ğ¾Ñ‚Ğ²ĞµÑ‡Ğ°ĞµÑ‚ Ğ½Ğ° Ğ²ÑĞµ Ğ²Ğ¾Ğ·Ğ½Ğ¸ĞºĞ°ÑÑ‰Ğ¸Ğµ Ğ²Ğ¾Ğ¿Ñ€Ğ¾ÑÑ‹. ĞÑ‡ĞµĞ½ÑŒ Ğ¿Ñ€Ğ¸ÑÑ‚Ğ½Ğ¾ Ñ€Ğ°Ğ±Ğ¾Ñ‚Ğ°Ñ‚ÑŒ Ñ Ñ‡ĞµĞ»Ğ¾Ğ²ĞµĞºĞ¾Ğ¼, ĞºĞ¾Ñ‚Ğ¾Ñ€Ğ¾Ğ¼Ñƒ Ğ´ĞµĞ¹ÑÑ‚Ğ²Ğ¸Ñ‚ĞµĞ»ÑŒĞ½Ğ¾ Ğ¼Ğ¾Ğ¶Ğ½Ğ¾ Ğ´Ğ¾Ğ²ĞµÑ€Ğ¸Ñ‚ÑŒ Ñ‚Ğ°ĞºĞ¾Ğ¹ Ğ²Ğ°Ğ¶Ğ½Ñ‹Ğ¹ Ğ²Ğ¾Ğ¿Ñ€Ğ¾Ñ. Ğ¡Ğ¿Ğ°ÑĞ¸Ğ±Ğ¾ Ğ·Ğ° Ğ¿Ñ€Ğ¾Ñ„ĞµÑÑĞ¸Ğ¾Ğ½Ğ°Ğ»Ğ¸Ğ·Ğ¼ Ğ¸ Ğ¿Ğ¾Ğ´Ğ´ĞµÑ€Ğ¶ĞºÑƒ! ğŸ™ğŸ¼â¤ï¸`,
  },
  {
    author: "Jim Apker",
    text: `Ruslana has been my lawyer for 6 years and I have never been disappointed in her services. She is experienced, a hard worker, and always very professional. Ruslana has earned my trust again and again, and I would highly recommend her to anyone in need of legal services.`,
  },
] as const;

const content = {
  tr: {
    kicker: "MÃ¼vekkil deneyimleri",
    title: "GÃ¼ven, paylaÅŸÄ±lan deneyimlerle gÃ¶rÃ¼nÃ¼r olur.",
    rating: "5 yÄ±ldÄ±z",
    open: "Google Haritalarâ€™da gÃ¶rÃ¼ntÃ¼le",
    previous: "Ã–nceki yorumu gÃ¶ster",
    next: "Sonraki yorumu gÃ¶ster",
  },
  ru: {
    kicker: "ĞĞ¿Ñ‹Ñ‚ Ğ´Ğ¾Ğ²ĞµÑ€Ğ¸Ñ‚ĞµĞ»ĞµĞ¹",
    title: "Ğ”Ğ¾Ğ²ĞµÑ€Ğ¸Ğµ ÑÑ‚Ğ°Ğ½Ğ¾Ğ²Ğ¸Ñ‚ÑÑ Ğ·Ğ°Ğ¼ĞµÑ‚Ğ½Ñ‹Ğ¼ Ğ±Ğ»Ğ°Ğ³Ğ¾Ğ´Ğ°Ñ€Ñ Ğ¾Ğ¿Ñ‹Ñ‚Ñƒ ĞºĞ»Ğ¸ĞµĞ½Ñ‚Ğ¾Ğ².",
    rating: "5 Ğ·Ğ²Ñ‘Ğ·Ğ´",
    open: "ĞŸĞ¾ÑĞ¼Ğ¾Ñ‚Ñ€ĞµÑ‚ÑŒ Ğ² Google ĞšĞ°Ñ€Ñ‚Ğ°Ñ…",
    previous: "ĞŸĞ¾ĞºĞ°Ğ·Ğ°Ñ‚ÑŒ Ğ¿Ñ€ĞµĞ´Ñ‹Ğ´ÑƒÑ‰Ğ¸Ğ¹ Ğ¾Ñ‚Ğ·Ñ‹Ğ²",
    next: "ĞŸĞ¾ĞºĞ°Ğ·Ğ°Ñ‚ÑŒ ÑĞ»ĞµĞ´ÑƒÑÑ‰Ğ¸Ğ¹ Ğ¾Ñ‚Ğ·Ñ‹Ğ²",
  },
  en: {
    kicker: "Client experiences",
    title: "Trust becomes visible through shared experience.",
    rating: "5 stars",
    open: "View on Google Maps",
    previous: "Show previous review",
    next: "Show next review",
  },
  ro: {
    kicker: "ExperienÈ›ele clienÈ›ilor",
    title: "Ãncrederea devine vizibilÄƒ prin experienÈ›ele Ã®mpÄƒrtÄƒÈ™ite.",
    rating: "5 stele",
    open: "VedeÈ›i pe Google Maps",
    previous: "AfiÈ™aÈ›i recenzia precedentÄƒ",
    next: "AfiÈ™aÈ›i recenzia urmÄƒtoare",
  },
} as const;

export default function TestimonialsCarousel() {
  const { language } = useSiteLanguage();
  const copy = content[language];
  const [active, setActive] = useState(0);
  const total = googleReviews.length;
  const previous = (active - 1 + total) % total;
  const next = (active + 1) % total;
  const visible = [previous, active, next];

  const move = (direction: -1 | 1) => setActive((current) => (current + direction + total) % total);

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title" data-no-translate>
      <header>
        <div>
          <span>{copy.kicker}</span>
          <h2 id="testimonials-title">{copy.title}</h2>
        </div>
      </header>
      <div className="testimonials-stage" aria-live="polite">
        {visible.map((reviewIndex, position) => {
          const review = googleReviews[reviewIndex];
          const isActive = position === 1;
          return (
            <article className={`testimonial-card ${isActive ? "is-active" : "is-side"}`} aria-hidden={!isActive} key={`${reviewIndex}-${review.author}`}>
              <div className="testimonial-stars" aria-label={copy.rating}>â˜…â˜…â˜…â˜…â˜…</div>
              <blockquote tabIndex={isActive ? 0 : -1}>{review.text}</blockquote>
              <footer><strong>{review.author}</strong><a href={googleMapsHref} target="_blank" rel="noreferrer" tabIndex={isActive ? 0 : -1}>{copy.open}<span aria-hidden="true">â†—</span></a></footer>
            </article>
          );
        })}
      </div>
      <div className="testimonials-controls">
        <button type="button" onClick={() => move(-1)} aria-label={copy.previous}><span aria-hidden="true">â†</span></button>
        <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <button type="button" onClick={() => move(1)} aria-label={copy.next}><span aria-hidden="true">â†’</span></button>
      </div>
    </section>
  );
}