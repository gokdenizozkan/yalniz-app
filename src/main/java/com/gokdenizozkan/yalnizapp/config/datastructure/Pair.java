package com.gokdenizozkan.yalnizapp.config.datastructure;

import java.util.Collections;

public class Pair {
    public final String key;
    public final Object value;

    public Pair(String key, Object value) {
        this.key = key;
        this.value = value;
    }

    public static Pair of(String key, Object value) {
        return new Pair(key, value);
    }
}
