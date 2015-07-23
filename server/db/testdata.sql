use piTunes;

-- Users Test Information
INSERT INTO Users (email, password, display_name, location, current_playlist_id, created_at, updated_at) VALUES ('test1@test.com', '$2a$10$sSDHQ7JpoTCqMJmYpfUy2uSkccf4qdLsnideITNh3uWaE8FVC9aRu' , 'Test User 1', 'test1', 1, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Users (email, password, display_name, location, current_playlist_id, created_at, updated_at) VALUES ('test2@test.com', '$2a$10$y65el7rqIvT4a3CWEDimPuvGZbBRkHuPUtekb6jaNBt8rqAtVm3M.' , 'Test User 2', 'test2', 4, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Users (email, password, display_name, location, current_playlist_id, created_at, updated_at) VALUES ('test3@test.com', '$2a$10$d2pp0lcUCCyig997MOq1ZO2kQ868ov9bfDwZIEcJ8c2/dxfVHa..S' , 'Test User 3', 'test3', 6, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Users (email, password, display_name, location, current_playlist_id, created_at, updated_at) VALUES ('test4@test.com', '$2a$10$.G2bupIS65iF07.Y.0JzYOk7fRpbqk3MsvSGZI2ZZnLxYfpFKFgiu' , 'Test User 4', 'test4', 7, '2015-07-22 00:00:00', '2015-07-22 00:00:00');

-- PLAYLISTS
INSERT INTO Playlists (user_id, name, current_media_index, created_at, updated_at) VALUES (1, 'TestUser1 Playlist 1', 1, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Playlists (user_id, name, current_media_index, created_at, updated_at) VALUES (1, 'TestUser1 Playlist 2', 1,'2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Playlists (user_id, name, current_media_index, created_at, updated_at) VALUES (1, 'TestUser1 Playlist 3', 1,'2015-07-22 00:00:00', '2015-07-22 00:00:00');

INSERT INTO Playlists (user_id, name, current_media_index, created_at, updated_at) VALUES (2, 'TestUser2 Playlist 1', 1,'2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Playlists (user_id, name, current_media_index, created_at, updated_at) VALUES (2, 'TestUser2 Playlist 2', 1,'2015-07-22 00:00:00', '2015-07-22 00:00:00');

INSERT INTO Playlists (user_id, name, current_media_index, created_at, updated_at) VALUES (3, 'TestUser3 Playlist 1', 1,'2015-07-22 00:00:00', '2015-07-22 00:00:00');

INSERT INTO Playlists (user_id, name, current_media_index, created_at, updated_at) VALUES (4, 'TestUser4 Playlist for 30 secs', 1, '2015-07-22 00:00:00', '2015-07-22 00:00:00');

-- MEDIA
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('2HQaBWziYvY', 'Darude - Sandstorm', 'https://i.ytimg.com/vi/2HQaBWziYvY/default.jpg', 225, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('N9qYF9DZPdw', '"Weird Al" Yankovic - White & Nerdy (Official Video)', 'https://i.ytimg.com/vi/N9qYF9DZPdw/default.jpg', 171, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('otCpCn0l4Wo', "MC Hammer - U Can't Touch This", "https://i.ytimg.com/vi/otCpCn0l4Wo/default.jpg", 278, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('a_XgQhMPeEQ', "Billy Joel - The Longest Time", "https://i.ytimg.com/vi/a_XgQhMPeEQ/default.jpg", 245, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('09R8_2nJtjg', "Maroon 5 - Sugar", "https://i.ytimg.com/vi/09R8_2nJtjg/default.jpg", 302, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('e-ORhEE9VVg', "Taylor Swift - Blank Space", "https://i.ytimg.com/vi/e-ORhEE9VVg/default.jpg", 273, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('AJtDXIazrMo', "Ellie Goulding - Love Me Like You Do (Official Video)", "https://i.ytimg.com/vi/AJtDXIazrMo/default.jpg", 250, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('lp-EO5I60KA', "Ed Sheeran - Thinking Out Loud [Official Video]", "https://i.ytimg.com/vi/lp-EO5I60KA/default.jpg", 297, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('8dVjSvLzD1I', "[MV] Apink(에이핑크) _ LUV", "https://i.ytimg.com/vi/8dVjSvLzD1I/default.jpg", 243, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('nntGTK2Fhb0', 'Skrillex and Diplo - "Where Are Ü Now" with Justin Bieber (Official Video)', "https://i.ytimg.com/vi/nntGTK2Fhb0/default.jpg", 252, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('YqeW9_5kURI', "Major Lazer & DJ Snake - Lean On (feat. MØ) (Official Music Video)", "https://i.ytimg.com/vi/YqeW9_5kURI/default.jpg", 179, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('nNi0gyO41VQ', 'Jason Derulo - "Cheyenne" (Official Music Video)', "https://i.ytimg.com/vi/nNi0gyO41VQ/default.jpg", 314, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('RgKAFK5djSk', "Wiz Khalifa - See You Again ft. Charlie Puth [Official Video] Furious 7 Soundtrack", "https://i.ytimg.com/vi/RgKAFK5djSk/default.jpg", 238, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('JO7qQ7peKeM', "[MV] GIRL'S DAY(걸스데이) _ Something(썸씽)", "https://i.ytimg.com/vi/JO7qQ7peKeM/default.jpg", 226, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('n1a7o44WxNo', "Zedd - Beautiful Now ft. Jon Bellion", "https://i.ytimg.com/vi/n1a7o44WxNo/default.jpg", 253, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('X46t8ZFqUB4', "Zedd - I Want You To Know ft. Selena Gomez", "https://i.ytimg.com/vi/X46t8ZFqUB4/default.jpg", 247, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('IxxstCcJlsc', "Zedd - Clarity (Official Video) ft. Foxes", "https://i.ytimg.com/vi/IxxstCcJlsc/default.jpg", 276, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('i-gyZ35074k', "Zedd - Stay The Night ft. Hayley Williams", "https://i.ytimg.com/vi/i-gyZ35074k/default.jpg", 217, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('EgT_us6AsDg', "Selena Gomez & The Scene - Love You Like A Love Song", "https://i.ytimg.com/vi/EgT_us6AsDg/default.jpg", 221, '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('U8UX2bbCHJw', "Nick Jonas - Chains", "https://i.ytimg.com/vi/U8UX2bbCHJw/default.jpg", 216, '2015-07-22 00:00:00', '2015-07-22 00:00:00');

-- 30 secs videos startig id 21
INSERT INTO Medias (youtube_id, title, img_url, duration, created_at, updated_at) VALUES ('hS5CfP8n_js', "Motivational short video - How to succeed - cartoon", "https://i.ytimg.com/vi/hS5CfP8n_js/default.jpg", 56, '2015-07-22 00:00:00', '2015-07-22 00:00:00');


-- ROOMS
INSERT INTO Rooms (name, created_at, updated_at) VALUES ('Root Room', '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Rooms (name, created_at, updated_at) VALUES ('UserTest1 Room', '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Rooms (name, private, password, created_at, updated_at) VALUES ('Public Room', false, '', '2015-07-22 00:00:00', '2015-07-22 00:00:00');
INSERT INTO Rooms (name, private, password, created_at, updated_at) VALUES ('Private Room', true, 'private', '2015-07-22 00:00:00', '2015-07-22 00:00:00');

-- MEDIA to user playlist
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 1, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 2, 2);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 3, 3);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 4, 4);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 5, 5);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 6, 6);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 7, 7);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 8, 8);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 9, 9);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 10, 10);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (1, 11, 11);

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 15, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 7, 2);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 16, 3);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 2, 4);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 14, 5);

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (3, 9, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (3, 12, 2);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (3, 13, 3);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (3, 3, 4);

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (4, 16, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (4, 17, 2);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (4, 18, 3);

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (5, 19, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (5, 20, 2);

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (6, 8, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (6, 17, 2);

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (7, 21, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (7, 21, 2);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (7, 21, 3);
