-- Seed: Bathroom Standard module in English

-- Module
INSERT INTO modules (id, slug, category, display_order, duration_min, video_url, cover_color, published)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'bathroom-standard',
  'rooms',
  10,
  12,
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  '#4B8EC8',
  true
);

-- Module translation (EN)
INSERT INTO module_translations (module_id, lang, title, description)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'en',
  'Bathroom — Standard Clean',
  'Complete standard bathroom cleaning procedure with chemical safety.'
);

-- Steps
INSERT INTO steps (id, module_id, step_order, icon_name, chip_label, chip_color) VALUES
  ('s1000000-0000-0000-0000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, 'Wind', NULL, NULL),
  ('s1000000-0000-0000-0000-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, 'ShieldCheck', NULL, NULL),
  ('s1000000-0000-0000-0000-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, 'FlaskConical', '1:10', '#4B8EC8'),
  ('s1000000-0000-0000-0000-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 'Clock', '5 min', '#F4A621'),
  ('s1000000-0000-0000-0000-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 'Hand', 'RED', '#D9434A'),
  ('s1000000-0000-0000-0000-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, 'Droplets', NULL, NULL),
  ('s1000000-0000-0000-0000-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 7, 'Sparkles', NULL, NULL);

-- Step translations (EN)
INSERT INTO step_translations (step_id, lang, title, body) VALUES
  ('s1000000-0000-0000-0000-000000000001', 'en', 'Open the window', 'Air must flow whenever you use chemicals.'),
  ('s1000000-0000-0000-0000-000000000002', 'en', 'Wear gloves and mask', 'PPE goes on before you open any bottle.'),
  ('s1000000-0000-0000-0000-000000000003', 'en', 'Spray R1 descaler 1:10', 'Cover all wet surfaces. Do not scrub yet.'),
  ('s1000000-0000-0000-0000-000000000004', 'en', 'Wait 5 minutes', 'Let the chemical do the work. Set a timer.'),
  ('s1000000-0000-0000-0000-000000000005', 'en', 'Scrub with the RED pad', 'Red is only for the toilet area. Never elsewhere.'),
  ('s1000000-0000-0000-0000-000000000006', 'en', 'Rinse with clean water', 'Top to bottom. No chemical residue.'),
  ('s1000000-0000-0000-0000-000000000007', 'en', 'Wipe dry, polish glass', 'Microfibre cloth. Streak-free finish.');

-- Checklist items
INSERT INTO checklist_items (id, module_id, item_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1),
  ('c1000000-0000-0000-0000-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2),
  ('c1000000-0000-0000-0000-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3),
  ('c1000000-0000-0000-0000-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4),
  ('c1000000-0000-0000-0000-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5),
  ('c1000000-0000-0000-0000-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6),
  ('c1000000-0000-0000-0000-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 7),
  ('c1000000-0000-0000-0000-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 8);

INSERT INTO checklist_translations (item_id, lang, text) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'en', 'Window opened, fan on'),
  ('c1000000-0000-0000-0000-000000000002', 'en', 'Gloves and mask worn'),
  ('c1000000-0000-0000-0000-000000000003', 'en', 'Red cloth and bucket ready'),
  ('c1000000-0000-0000-0000-000000000004', 'en', 'R1 mixed at 1:10'),
  ('c1000000-0000-0000-0000-000000000005', 'en', 'Sprayed and waited 5 minutes'),
  ('c1000000-0000-0000-0000-000000000006', 'en', 'Scrubbed in correct order'),
  ('c1000000-0000-0000-0000-000000000007', 'en', 'Rinsed top to bottom'),
  ('c1000000-0000-0000-0000-000000000008', 'en', 'Glass and mirror polished');

-- Chemicals reference
INSERT INTO chemicals (code, name_en, dilution, hazard_level, ppe_required) VALUES
  ('R1', 'Descaler / Bathroom Cleaner', '1:10', 'medium', '{gloves,mask}'),
  ('R2', 'Glass Cleaner', '1:20', 'low', '{gloves}'),
  ('R6', 'Floor Cleaner', '1:30', 'low', '{gloves}');

-- Tools (cloth colors)
INSERT INTO tools (slug, cloth_color) VALUES
  ('red-cloth', 'red'),
  ('yellow-cloth', 'yellow'),
  ('blue-cloth', 'blue'),
  ('green-cloth', 'green'),
  ('white-cloth', 'white');
