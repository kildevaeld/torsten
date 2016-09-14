
CREATE TABLE IF NOT EXISTS `file` (
    `cid` binary(16) PRIMARY KEY NOT NULL,
    `name` varchar(255) NOT NULL,
    `mime_type` varchar(50) NOT NULL DEFAULT 'application/octet-stream',
    `size` bigint NOT NULL,
    `uid` int(11) NOT NULL,
    `gid` int(11) NOT NULL DEFAULT 0,
    `perms` int DEFAULT '190' ,
    `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
    `mtime` datetime ON UPDATE CURRENT_TIMESTAMP,
    `meta` varchar(500) default '{}',
    `sha1` binary(20) DEFAULT NULL,
    INDEX file_name_index (`name`)
);


CREATE TABLE IF NOT EXISTS `file_status` (
    `path` varchar(255) NOT NULL,
    `status` varchar(20) NOT NULL DEFAULT 'creating',
    `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX file_status_path_index (`path`),
    PRIMARY KEY(`path`)
);


CREATE TABLE IF NOT EXISTS `file_node` (
    `id` integer PRIMARY KEY auto_increment,
    `is_dir` tinyint(1) NOT NULL default '0',
    `path` varchar(255) NOT NULL,
    `parent_id` int(11) DEFAULT NULL,
    `file_id` binary(16) DEFAULT NULL,
    FOREIGN KEY (`file_id`) REFERENCES `file`(`cid`) ON DELETE CASCADE,
    FOREIGN KEY (`parent_id`) REFERENCES `file_node`(`id`) ON DELETE CASCADE,
    UNIQUE INDEX node_path_index (`path`)
);


