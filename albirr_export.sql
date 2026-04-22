--
-- PostgreSQL database dump
--

\restrict RCmZyY310ZAIitdZWkJgZiER8PHG34hgLfI0sH5LLVN6iCLNbcLCoWDQOHz4zEb

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts VALUES (2, 'jane smith', 'jane@gmail.com', 'Employment', 'would like to join your team...', '2026-04-12 23:43:13.184367');


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events VALUES (6, 'Haflah Program', 'Quran memorization celebration', '2026-08-28', '2026-04-15 21:10:42.868655', '2026-04-15 23:22:22.913919');
INSERT INTO public.events VALUES (8, 'Career Day: "When I Grow Up"', 'Our pupils will dress up as their future selves. We invite parents to come and give short talks about their professions to inspire the next generation.', '2026-04-15', '2026-04-18 23:25:29.441643', '2026-04-18 23:25:29.441643');
INSERT INTO public.events VALUES (3, 'Termly Parent-Teacher Consultations', 'Communication is the bridge between home and school. Join us for our termly Parent Teachers Meeting.', '2026-04-09', '2026-04-13 13:55:52.958289', '2026-04-15 23:22:22.913919');
INSERT INTO public.events VALUES (9, 'Spelling Bee & Mental Math Challenge', 'Watch our linguistic masters and math whizzes compete for the ultimate trophy. This event encourages healthy competition and sharpens critical thinking skills in a fun, high-energy environment.', '2026-04-30', '2026-04-18 23:29:58.069532', '2026-04-18 23:29:58.069532');


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news VALUES (7, ' 3 Tips to Help Your Child Manage Exam Stress', 'Academic', 'Exam season can be a tense time for families. To ensure our students perform their best, we recommend these three strategies:

1. Consistent Study Routine: Encourage 45-minute blocks rather than "marathon" sessions.
2. Balanced Nutrition: A healthy breakfast is fuel for the brain.

3. Digital Detox: Limit social media use during the final weeks of revision.
Remember, your support and encouragement are the biggest confidence boosters a student can have.', '📰', '2026-04-15 21:03:46.823246', '2026-04-15 23:22:22.798111');
INSERT INTO public.news VALUES (9, 'Beyond the Blackboard: How Our Pupils Are Learning Through Fun', 'Academic', 'At Al-Birr, we believe that the best learning happens when children are having fun! This term, our Basic 2 pupils took their math lesson outdoors to learn about measurements using sand and water. Meanwhile, the Nursery section explored "Community Helpers" by dressing up as doctors, firefighters, and teachers. These hands-on activities help our children grasp complex concepts early while building their social skills and confidence.', '📰', '2026-04-18 23:11:25.597626', '2026-04-18 23:11:25.597626');
INSERT INTO public.news VALUES (10, 'Raising a Reader: 3 Simple Ways to Support Literacy at Home', 'Announcement', 'Literacy is the foundation of all learning. You don''t need a library to help your child love books! Try these tips:
The 10-Minute Bedtime Story: Read aloud to your child every night.
Word Hunt: While driving or walking, ask your child to identify letters or words on street signs.
Praise Effort: Celebrate when they sound out a difficult word correctly.
Together, we can turn every pupil into a lifelong reader!
Call to Action: Check out our Monthly Reading List for age-appropriate book recommendation', '📰', '2026-04-18 23:19:21.316821', '2026-04-18 23:19:21.316821');


--
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.staff VALUES (4, 'Alhaji Ridwan Olaniyan', 'Vice Principal', 'PGD in Islamic Education', '👩‍🎤', '2026-04-13 13:56:15.404945', '/uploads/1776521854730-169136586.png', '2026-04-15 23:22:22.916529');
INSERT INTO public.staff VALUES (3, 'Mr. Taofeeq Sodiq', 'Head of Tahfeedh', 'B.Ed. University of Ibadan', '👨‍🔬', '2026-04-13 13:56:15.404945', '/uploads/1776521873215-51365927.png', '2026-04-15 23:22:22.916529');
INSERT INTO public.staff VALUES (7, 'Mrs. Abdussalam Aisha', 'Head of Sport', 'Athletes', '👨‍🎓', '2026-04-13 13:56:15.404945', '/uploads/1776521887311-664523309.png', '2026-04-15 23:22:22.916529');
INSERT INTO public.staff VALUES (2, 'Mrs. Muhammad Fareedah', 'Principal', 'Former FGC Biology teacher, curriculum specialist', '👩‍🏫', '2026-04-13 13:56:15.404945', '/uploads/1776521833011-525466719.png', '2026-04-15 23:22:22.916529');


--
-- Data for Name: whatsapp_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.whatsapp_settings VALUES (1, '2349061984923', 'Hello! I am interested in enrolling my child at Al-Birr Islamic Model School. Please provide more information.', '2026-04-18 22:08:07.208122');


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 7, true);


--
-- Name: enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrollments_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 9, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 10, true);


--
-- Name: staff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.staff_id_seq', 10, true);


--
-- Name: whatsapp_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.whatsapp_settings_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict RCmZyY310ZAIitdZWkJgZiER8PHG34hgLfI0sH5LLVN6iCLNbcLCoWDQOHz4zEb

