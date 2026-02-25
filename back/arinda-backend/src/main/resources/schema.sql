-- Create missing @ElementCollection tables for Aiven MySQL (requires primary keys)

CREATE TABLE IF NOT EXISTS listing_amenities (
    id BIGINT NOT NULL AUTO_INCREMENT,
    listing_id BIGINT NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT fk_amenities_listing FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS listing_inclusions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    listing_id BIGINT NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT fk_inclusions_listing FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS listing_establishments (
    id BIGINT NOT NULL AUTO_INCREMENT,
    listing_id BIGINT NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT fk_establishments_listing FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE
);
