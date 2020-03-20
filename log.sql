-- 创建数据库
create database if not exists music_app;

-- 创建用户表
create table if not exists users_table (
    id int primary key auto_increment,
    name varchar(32) not null unique,
    nickName varchar(32) not null unique,
    password varchar(64) not null,
    isValid tinyint default 1,
    createdTime dateTime default Now()
)

-- 创建歌曲表
create table if not exists musics_table(
    id int primary key auto_increment,
    name varchar(32) not null,
    singer varchar(32) not null,
    audioUrl varchar(80) not null,
    imgUrl varchar(80) not null,
    isValid tinyint default 1,
    createdTime dateTime default Now() 
)

-- 创建收藏表
create table if not exists collections_table(
    id int primary key auto_increment,
    music_id int not null,
    user_id int not null,
    isValid tinyint default 1,
    createdTime dateTime default Now()
);

-- select musics_table.id, musics_table.name, musics_table.singer, musics_table.audioUrl, musics_table.imgUrl, collections_table.id as collectionId from musics_table left join collections_table on musics_table.id = collections_table.music_id where user_id = 1;
