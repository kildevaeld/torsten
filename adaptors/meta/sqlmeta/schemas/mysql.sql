CREATE TABLE IF NOT EXISTS `file_node` (
    `id` binary(16) PRIMARY KEY NOT NULL,
    `path` varchar(255) NOT NULL,
    `uid` binary(16) NOT NULL,
    `gid` binary(16) NOT NULL,
    `perms` int DEFAULT '500',
    `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
    `mtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `parent_id` binary(16) DEFAULT NULL,
    `hidden` smallint(1) DEFAULT 0,
    FOREIGN KEY (`parent_id`) REFERENCES `file_node`(`id`) ON DELETE CASCADE,
    UNIQUE INDEX node_path_index (`path`)
);

CREATE TABLE IF NOT EXISTS `file_info` (
    `id` binary(16) PRIMARY KEY NOT NULL,
    `name` varchar(255) NOT NULL,
    `mime_type` varchar(50) NOT NULL DEFAULT 'application/octet-stream',
    `size` bigint NOT NULL DEFAULT 0,
    `uid` binary(16) NOT NULL,
    `gid` binary(16) NOT NULL,
    `perms` int DEFAULT '500' ,
    `ctime` datetime DEFAULT CURRENT_TIMESTAMP,
    `mtime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `meta` varchar(1000) default '{}',
    `sha1` binary(20) DEFAULT NULL,
    `hidden` smallint(1) NOT NULL DEFAULT '0',
    `node_id` binary(16) NOT NULL,
    FOREIGN KEY (`node_id`) REFERENCES `file_node`(`id`) ON DELETE CASCADE,
    INDEX file_info_name_index (`name`)
);

