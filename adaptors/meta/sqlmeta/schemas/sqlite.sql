PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS `file_node` (
    `id` binary(16) PRIMARY KEY,
    `path` varchar(255) NOT NULL,
    `uid` binary(16) NOT NULL,
    `gid` binary(16) NOT NULL,
    `perms` int DEFAULT '500',
    `ctime` datetime DEFAULT (datetime('now', 'localtime')),
    `mtime` datetime DEFAULT (datetime('now', 'localtime')),
    `parent_id` binary(16) DEFAULT NULL,
    `hidden` smallint(1) DEFAULT 0,
    FOREIGN KEY (`parent_id`) REFERENCES `file_node`(`id`) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS node_path_index ON `file_node`(`path`);

CREATE TABLE IF NOT EXISTS `file_info` (
    `id` binary(16) PRIMARY KEY NOT NULL,
    `name` varchar(255) NOT NULL,
    `mime_type` varchar(50) NOT NULL DEFAULT 'application/octet-stream',
    `size` bigint NOT NULL DEFAULT 0,
    `uid` binary(16) NOT NULL,
    `gid` binary(16) NOT NULL,
    `perms` int DEFAULT '500' ,
    `ctime` datetime DEFAULT (datetime('now', 'localtime')),
    `mtime` datetime DEFAULT (datetime('now', 'localtime')),
    `meta` text default '{}',
    `sha1` binary(20) DEFAULT NULL,
    `hidden` smallint(1) NOT NULL DEFAULT '0',
    `node_id` binary(16) NOT NULL,
    FOREIGN KEY (`node_id`) REFERENCES `file_node`(`id`) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS file_info_name_index ON file_info(`name`);

