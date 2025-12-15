package com.abemivi.arinda.arindabackend.service;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class SanitizationService {

    // No HTML allowed (Strict)
    public String sanitizeStrict(String input) {
        if (input == null) return null;
        return Jsoup.clean(input, Safelist.none());
    }
}