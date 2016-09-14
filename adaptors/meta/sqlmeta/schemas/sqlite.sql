PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS `file` (
    `cid` binary(16) PRIMARY KEY NOT NULL,
    `name` varchar(255) NOT NULL,
    `mime_type` varchar(50) NOT NULL DEFAULT 'application/octet-stream',
    `size` bigint NOT NULL,
    `uid` int(11) NOT NULL,
    `gid` int(11) NOT NULL DEFAULT 0,
    `perms` int DEFAULT '190' ,
    `ctime` datetime DEFAULT (datetime('now', 'localtime')),
    `mtime` datetime DEFAULT (datetime('now', 'localtime')),
    `meta` text default '{}',
    `sha1` binary(20) DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS file_name_index ON file(`name`);

CREATE TABLE IF NOT EXISTS `file_status` (
    `path` varchar(255) NOT NULL,
    `status` varchar(20) NOT NULL DEFAULT 'creating',
    `ctime` real DEFAULT (datetime('now', 'localtime')),
    PRIMARY KEY(`path`)
);

CREATE UNIQUE INDEX IF NOT EXISTS file_status_path_index ON `file_status`(`path`)

CREATE TABLE IF NOT EXISTS `file_node` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `is_dir` tinyint(1) NOT NULL default '0',
    `path` varchar(255) NOT NULL,
    `parent_id` int(11) DEFAULT NULL,
    `file_id` binary(16) DEFAULT NULL,
    FOREIGN KEY (`file_id`) REFERENCES `file`(`cid`) ON DELETE CASCADE,
    FOREIGN KEY (`parent_id`) REFERENCES `file_node`(`id`) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS node_path_index ON `file_node`(`path`);

