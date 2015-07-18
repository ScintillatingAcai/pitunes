use piTunes;

-- Users Test Information
INSERT INTO Users (email, password, display_name, location, created_at, updated_at) VALUES ('test1@test.com', '$2a$10$sSDHQ7JpoTCqMJmYpfUy2uSkccf4qdLsnideITNh3uWaE8FVC9aRu' , 'Test User 1', 'test1', '2015-07-15 00:00:00', '2015-07-15 00:00:00');  
INSERT INTO Users (email, password, display_name, location, created_at, updated_at) VALUES ('test2@test.com', '$2a$10$y65el7rqIvT4a3CWEDimPuvGZbBRkHuPUtekb6jaNBt8rqAtVm3M.' , 'Test User 2', 'test2', '2015-07-15 00:00:00', '2015-07-15 00:00:00');  
INSERT INTO Users (email, password, display_name, location, created_at, updated_at) VALUES ('test3@test.com', '$2a$10$d2pp0lcUCCyig997MOq1ZO2kQ868ov9bfDwZIEcJ8c2/dxfVHa..S' , 'Test User 3', 'test3', '2015-07-15 00:00:00', '2015-07-15 00:00:00');  
INSERT INTO Users (email, password, display_name, location, created_at, updated_at) VALUES ('test4@test.com', '$2a$10$.G2bupIS65iF07.Y.0JzYOk7fRpbqk3MsvSGZI2ZZnLxYfpFKFgiu' , 'Test User 4', 'test4', '2015-07-15 00:00:00', '2015-07-15 00:00:00');  

-- PLAYLISTS
INSERT INTO Playlists (user_id, name, created_at, updated_at) VALUES (1, 'TestUser1 Playlist 1', '2015-07-15 00:00:00', '2015-07-15 00:00:00');  
INSERT INTO Playlists (user_id, name, created_at, updated_at) VALUES (1, 'TestUser1 Playlist 2', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Playlists (user_id, name, created_at, updated_at) VALUES (1, 'TestUser1 Playlist 3', '2015-07-15 00:00:00', '2015-07-15 00:00:00');

INSERT INTO Playlists (user_id, name, created_at, updated_at) VALUES (2, 'TestUser2 Playlist 1', '2015-07-15 00:00:00', '2015-07-15 00:00:00');

INSERT INTO Playlists (user_id, name, created_at, updated_at) VALUES (3, 'TestUser3 Playlist 1', '2015-07-15 00:00:00', '2015-07-15 00:00:00');


-- MEDIA
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('2HQaBWziYvY', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('N9qYF9DZPdw', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('otCpCn0l4Wo', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('a_XgQhMPeEQ', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('09R8_2nJtjg', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('e-ORhEE9VVg', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('AJtDXIazrMo', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('hfXZ6ydgZyo', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('HaMq2nn5ac0', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('lp-EO5I60KA', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Medias (youtube_id, created_at, updated_at) VALUES ('8dVjSvLzD1I', '2015-07-15 00:00:00', '2015-07-15 00:00:00');

-- ROOMS
INSERT INTO Rooms (name, created_at, updated_at) VALUES ('Root Room', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Rooms (name, created_at, updated_at) VALUES ('UserTest1 Room', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Rooms (name, private, password, created_at, updated_at) VALUES ('Public Room', false, '', '2015-07-15 00:00:00', '2015-07-15 00:00:00');
INSERT INTO Rooms (name, private, password, created_at, updated_at) VALUES ('Private Room', true, 'private', '2015-07-15 00:00:00', '2015-07-15 00:00:00');

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

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 4, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 7, 2);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 6, 3);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 2, 4);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (2, 1, 5);

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (3, 9, 1);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (3, 11, 2);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (3, 10, 3);
INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (3, 3, 4);

INSERT INTO Media_Playlists (playlist_id, media_id, media_order) VALUES (4, 8, 1);
