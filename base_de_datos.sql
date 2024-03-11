create table if not exists public."SequelizeMeta"
(
    name varchar(255) not null
        primary key
);

create table if not exists public.users
(
    id        serial
        primary key,
    email     varchar(255)                                   not null
        unique,
    password  varchar(255)                                   not null,
    role      varchar(255) default 'user'::character varying not null,
    create_at timestamp with time zone                       not null,
    name      varchar
);

create table if not exists public.tickets
(
    id          serial
        primary key,
    title       varchar(255)                                   not null,
    description text                                           not null,
    status      varchar(255) default 'open'::character varying not null,
    priority    enum_tickets_priority                          not null,
    assigned_to integer,
    created_at  timestamp with time zone                       not null
);

