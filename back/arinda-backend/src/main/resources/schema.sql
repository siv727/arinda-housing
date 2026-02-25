-- Create missing @ElementCollection tables (IF NOT EXISTS prevents errors on re-deploy)

CREATE TABLE IF NOT EXISTS listing_amenities (
    listing_id BIGINT NOT NULL,
    name VARCHAR(255),
    CONSTRAINT fk_amenities_listing FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS listing_inclusions (
    listing_id BIGINT NOT NULL,
    name VARCHAR(255),
    CONSTRAINT fk_inclusions_listing FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS listing_establishments (
    listing_id BIGINT NOT NULL,
    name VARCHAR(255),
    CONSTRAINT fk_establishments_listing FOREIGN KEY (listing_id) REFERENCES listing(id) ON DELETE CASCADE
);
